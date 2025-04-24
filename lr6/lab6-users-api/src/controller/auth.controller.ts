import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '../service/user.service';

const SECRET = 'super_secret'; // use process.env.SECRET in real apps

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await UserService.getByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
};
