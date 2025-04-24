import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'super_secret';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, SECRET) as any;
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
};