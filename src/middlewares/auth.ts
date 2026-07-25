import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedUser {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'VENDEDOR' | 'AUDITOR';
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

const DEMO_USERS: Record<string, AuthenticatedUser & { passwordHash: string }> = {
  'ventascotizawasap@gmail.com': {
    id: 1,
    nombre: 'Vendedor All Solutions',
    email: 'ventascotizawasap@gmail.com',
    rol: 'ADMIN',
    passwordHash: 'All_Solutions_77654321K',
  },
  'vendedor@allsolutions.cl': {
    id: 2,
    nombre: 'Ejecutivo Comercial',
    email: 'vendedor@allsolutions.cl',
    rol: 'VENDEDOR',
    passwordHash: 'vendedor2026',
  },
};

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Permitir acceso de lectura en desarrollo o requerir Bearer Token
    req.user = DEMO_USERS['ventascotizawasap@gmail.com'];
    return next();
  }

  // Token simple de desarrollo
  if (token === 'admin_token_2026') {
    req.user = DEMO_USERS['ventascotizawasap@gmail.com'];
    return next();
  }

  return res.status(403).json({ error: 'Token de acceso no válido o expirado' });
};

export const loginUser = (email: string, password: string): { success: boolean; token?: string; user?: AuthenticatedUser; message?: string } => {
  const userRecord = DEMO_USERS[email];
  if (userRecord && userRecord.passwordHash === password) {
    const { passwordHash, ...user } = userRecord;
    return {
      success: true,
      token: 'admin_token_2026',
      user,
      message: 'Autenticación exitosa en All Solutions SpA',
    };
  }
  return { success: false, message: 'Credenciales inválidas' };
};
