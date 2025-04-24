import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { User } from '../entity/User';
import { Repository } from 'typeorm';

const userRepo: Repository<User> = AppDataSource.getRepository(User);

export const getUsers = async (_: Request, res: Response): Promise<Response> => {
    const users = await userRepo.find();
    return res.json(users);
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepo.findOneBy({ id: +req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user = userRepo.create(req.body);
    const result = await userRepo.save(user);
    return res.status(201).json(result);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await userRepo.findOneBy({ id: +req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    userRepo.merge(user, req.body);
    const result = await userRepo.save(user);
    return res.json(result);
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const result = await userRepo.delete(+req.params.id);
    return res.json(result);
};
