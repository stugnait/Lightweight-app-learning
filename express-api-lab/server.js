const express = require('express');
const morgan = require('morgan');
const usersRoutes = require('./routes/users');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger")

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Використовуємо маршрути
app.use('/users', usersRoutes);

// Додаємо Swagger UI для доступу до документації
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Start server
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
