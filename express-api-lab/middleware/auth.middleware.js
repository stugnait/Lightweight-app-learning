// middleware/auth.middleware.js

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: 'Токен не знайдено' });
    }

    // Тут можна перевіряти токен на валідність (наприклад, за допомогою jwt)
    // Для простоти, припустимо, що токен завжди валідний
    if (token !== 'valid-token') {
        return res.status(403).json({ message: 'Невірний токен' });
    }

    next(); // Якщо токен правильний, передаємо до наступного middleware або контролера
};
