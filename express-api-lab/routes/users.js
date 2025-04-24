// routes/users.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Логін користувача
 *     description: Користувач входить у систему, передаючи ім'я користувача і пароль.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Логін успішний
 *       400:
 *         description: Поля мають бути заповнені
 */
router.post(
    '/login',
    body('username').notEmpty().withMessage('Ім\'я користувача має бути заповнене'),
    body('password').notEmpty().withMessage('Пароль має бути заповнений'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    },
    userController.login
);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Реєстрація користувача
 *     description: Користувач реєструється у системі, передаючи ім'я користувача і пароль.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Реєстрація успішна
 *       400:
 *         description: Поля мають бути заповнені
 */
router.post(
    '/register',
    body('username').notEmpty().withMessage('Ім\'я користувача має бути заповнене'),
    body('password').notEmpty().withMessage('Пароль має бути заповнений'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    },
    userController.register
);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Отримати профіль користувача
 *     description: Потрібно передати токен для доступу до цього маршруту.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Профіль користувача
 *       401:
 *         description: Неавторизований
 */
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Профіль користувача' });
});

/**
 * @swagger
 * /users/update:
 *   patch:
 *     summary: Оновити користувача
 *     description: Оновлення інформації користувача.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Користувача оновлено
 */
router.patch('/update', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Користувача оновлено' });
});

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Видалити користувача
 *     description: Видалення користувача зі системи.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Користувача видалено
 */
router.delete('/delete', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Користувача видалено' });
});

module.exports = router;
