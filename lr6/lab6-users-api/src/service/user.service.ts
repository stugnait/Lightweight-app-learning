import { AppDataSource } from '../db';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

const userRepo: Repository<User> = AppDataSource.getRepository(User);

export const UserService = {
    getAll: async () => userRepo.find(),

    getById: async (id: number) => userRepo.findOneBy({ id }),

    getByEmail: async (email: string) => userRepo.findOneBy({ email }),

    create: async (data: Partial<User>) => {
        data.password = await bcrypt.hash(data.password!, 10);
        return await userRepo.save(userRepo.create(data));
    },

    update: async (id: number, data: Partial<User>) => {
        const user = await userRepo.findOneBy({ id });
        if (!user) throw new Error('User not found');
        userRepo.merge(user, data);
        return await userRepo.save(user);
    },

    delete: async (id: number) => userRepo.delete(id)
};