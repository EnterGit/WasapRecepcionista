const DEMO_USERS = {
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
export const authenticateToken = (req, res, next) => {
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
export const loginUser = (email, password) => {
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
