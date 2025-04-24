import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './db';
import userRoutes from './routes/user.routes';
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
