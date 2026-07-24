import { checkDatabaseConnection, getDbPool } from '../database/db.js';

export interface Customer {
  id?: number;
  telefono: string;
  nombre: string;
  rut?: string;
  email?: string;
  estado: 'LEAD' | 'COTIZANDO' | 'CLIENTE_ACTIVO' | 'INACTIVO';
}

const memoryCustomers: Map<string, Customer> = new Map();

export async function findOrCreateCustomer(telefono: string, nombre: string): Promise<Customer> {
  const isConnected = await checkDatabaseConnection();

  if (isConnected) {
    try {
      const db = getDbPool();
      const [rows]: any = await db.query('SELECT * FROM clientes WHERE telefono = ?', [telefono]);
      if (rows.length > 0) {
        return rows[0] as Customer;
      }
      const [result]: any = await db.query(
        'INSERT INTO clientes (telefono, nombre, estado) VALUES (?, ?, ?)',
        [telefono, nombre, 'COTIZANDO']
      );
      return { id: result.insertId, telefono, nombre, estado: 'COTIZANDO' };
    } catch (err) {
      console.warn(`⚠️ Fallback MySQL al guardar cliente: ${err}`);
    }
  }

  // Memory Fallback
  if (!memoryCustomers.has(telefono)) {
    memoryCustomers.set(telefono, {
      id: memoryCustomers.size + 1,
      telefono,
      nombre,
      estado: 'COTIZANDO'
    });
  }
  return memoryCustomers.get(telefono)!;
}

export async function getAllCustomers(): Promise<Customer[]> {
  const isConnected = await checkDatabaseConnection();
  if (isConnected) {
    try {
      const db = getDbPool();
      const [rows]: any = await db.query('SELECT * FROM clientes ORDER BY creado_el DESC');
      return rows as Customer[];
    } catch (err) {
      console.warn(`⚠️ Error leyendo clientes de MySQL: ${err}`);
    }
  }
  return Array.from(memoryCustomers.values());
}
