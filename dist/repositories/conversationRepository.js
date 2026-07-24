import { checkDatabaseConnection, getDbPool } from '../database/db.js';
const memoryConversations = [];
export async function saveConversation(clienteId, mensajeCliente, respuestaIa, intentDetectado = 'CONSULTA_GENERAL') {
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
        try {
            const db = getDbPool();
            const [res] = await db.query(`INSERT INTO conversaciones (cliente_id, mensaje_cliente, respuesta_ia, intent_detectado) VALUES (?, ?, ?, ?)`, [clienteId, mensajeCliente, respuestaIa, intentDetectado]);
            return { id: res.insertId, clienteId, mensajeCliente, respuestaIa, intentDetectado };
        }
        catch (err) {
            console.warn(`⚠️ Error guardando conversación en MySQL: ${err}`);
        }
    }
    // Memory Fallback
    const record = { id: memoryConversations.length + 1, clienteId, mensajeCliente, respuestaIa, intentDetectado, creadoEl: new Date() };
    memoryConversations.push(record);
    return record;
}
export async function getConversationHistoryByCustomer(clienteId) {
    const isConnected = await checkDatabaseConnection();
    if (isConnected) {
        try {
            const db = getDbPool();
            const [rows] = await db.query(`SELECT * FROM conversaciones WHERE cliente_id = ? ORDER BY creado_el ASC`, [clienteId]);
            return rows;
        }
        catch (err) {
            console.warn(`⚠️ Error consultando historial de conversación en MySQL: ${err}`);
        }
    }
    return memoryConversations.filter(c => c.clienteId === clienteId);
}
