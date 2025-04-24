import { Router } from 'express';
import { authenticate, authorizeAdmin } from "../middleware/auth.middlewarre";

const router = Router();

router.get('/admin', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: 'Welcome, admin!' });
});

export default router;