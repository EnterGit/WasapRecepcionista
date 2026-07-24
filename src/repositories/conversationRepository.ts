import { checkDatabaseConnection, getDbPool } from '../database/db.js';

export interface ConversationRecord {
  id?: number;
  clienteId: number;
  mensajeCliente: string;
  respuestaIa: string;
  intentDetectado: string;
  creadoEl?: Date;
}

const memoryConversations: ConversationRecord[] = [];

export async function saveConversation(clienteId: number, mensajeCliente: string, respuestaIa: string, intentDetectado = 'CONSULTA_GENERAL'): Promise<ConversationRecord> {
  const isConnected = await checkDatabaseConnection();

  if (isConnected) {
    try {
      const db = getDbPool();
      const [res]: any = await db.query(
        `INSERT INTO conversaciones (cliente_id, mensaje_cliente, respuesta_ia, intent_detectado) VALUES (?, ?, ?, ?)`,
        [clienteId, mensajeCliente, respuestaIa, intentDetectado]
      );
      return { id: res.insertId, clienteId, mensajeCliente, respuestaIa, intentDetectado };
    } catch (err) {
      console.warn(`⚠️ Error guardando conversación en MySQL: ${err}`);
    }
  }

  // Memory Fallback
  const record = { id: memoryConversations.length + 1, clienteId, mensajeCliente, respuestaIa, intentDetectado, creadoEl: new Date() };
  memoryConversations.push(record);
  return record;
}

export async function getConversationHistoryByCustomer(clienteId: number): Promise<ConversationRecord[]> {
  const isConnected = await checkDatabaseConnection();
  if (isConnected) {
    try {
      const db = getDbPool();
      const [rows]: any = await db.query(`SELECT * FROM conversaciones WHERE cliente_id = ? ORDER BY creado_el ASC`, [clienteId]);
      return rows as ConversationRecord[];
    } catch (err) {
      console.warn(`⚠️ Error consultando historial de conversación en MySQL: ${err}`);
    }
  }
  return memoryConversations.filter(c => c.clienteId === clienteId);
}
