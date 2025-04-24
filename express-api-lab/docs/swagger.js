// docs/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

// Swagger документація налаштування
const swaggerDefinition = {
    openapi: '3.0.0', // Версія OpenAPI
    info: {
        title: 'API для користувачів',
        version: '1.0.0',
        description: 'Документація API для користувачів (логін, реєстрація, профіль і т.д.)'
    },
    servers: [
        {
            url: 'http://localhost:3000', // URL сервера
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/users.js'], // Шлях до файлів, де будуть описані маршрути
};

// Генерація Swagger документації
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
