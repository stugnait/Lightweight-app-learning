const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
require('dotenv').config(); // Підключення dotenv

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

// Створюємо сервер
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Аналізуємо URL

    // Встановлюємо заголовки
    res.setHeader('Content-Type', 'text/html');

    // Головна сторінка
    if (parsedUrl.pathname === '/') {
        if (req.method === 'GET') {
            fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Помилка сервера');
                } else {
                    res.statusCode = 200;
                    res.end(data);
                }
            });
        }
    }

    // Сторінка "Про нас"
    else if (parsedUrl.pathname === '/about') {
        if (req.method === 'GET') {
            fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Помилка сервера');
                } else {
                    res.statusCode = 200;
                    res.end(data);
                }
            });
        }
    }

    // Обробка POST-запиту
    else if (parsedUrl.pathname === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            console.log('POST Data:', body);
            res.statusCode = 200;
            res.end('Дані отримано');
        });
    }

    // Обробка незнайомих запитів
    else {
        res.statusCode = 404;
        res.end('Сторінка не знайдена');
    }
});

// Запуск сервера
server.listen(port, hostname, () => {
    console.log(`Сервер працює на http://${hostname}:${port}/`);
});
