import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    // Obtenemos el jwt de la cabecera de autoización
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);
    // Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);

    if (token == null) {
        return res.sendStatus(401);
    }

    // Verificamos y decodificamos el token
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        // Si el token es valido
        console.log('user', user);
        
        req.user = user;
        next();
    })
}