import  jwt  from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";

interface DecodedToken {
    id: string;
}

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PASSWORD!) as DecodedToken;

        req.user = { id: decoded.id };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalido o expirado' });
    }
};