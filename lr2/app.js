const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data.txt');
const logFile = path.join(__dirname, 'log.txt');
const jsonFile = path.join(__dirname, 'data.json');

function logMessage(message) {
    const logStream = fs.createWriteStream(logFile, { flags: 'a' });
    const logEntry = `${new Date().toISOString()} - ${message}\n`;
    logStream.write(logEntry);
    logStream.end();
}

function writeFile() {
    try {
        fs.writeFileSync(dataFile, 'Це текстовий файл, створений у Node.js.');
        console.log('Файл data.txt створено і записано.');
        logMessage('Файл data.txt створено і записано.');
    } catch (err) {
        console.error('Помилка при запису в data.txt:', err);
        logMessage(`Помилка при запису в data.txt: ${err.message}`);
    }
}

function readFile() {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        console.log('Вміст файлу data.txt:', data);
        logMessage('Файл data.txt успішно прочитано.');
    } catch (err) {
        console.error('Помилка при читанні data.txt:', err);
        logMessage(`Помилка при читанні data.txt: ${err.message}`);
    }
}

function writeStream() {
    try {
        const writeStream = fs.createWriteStream(dataFile, { flags: 'a' });
        writeStream.write('\nДоданий новий текст через потік.\n', (err) => {
            if (err) throw err;
        });
        writeStream.end();
        console.log('Текст записано через потік у data.txt.');
        logMessage('Текст записано через потік у data.txt.');
    } catch (err) {
        console.error('Помилка при запису через потік:', err);
        logMessage(`Помилка при запису через потік: ${err.message}`);
    }
}

function updateJsonFile() {
    try {
        let jsonData = { name: 'Користувач', age: 25 };

        if (fs.existsSync(jsonFile)) {
            const data = fs.readFileSync(jsonFile, 'utf8');
            jsonData = JSON.parse(data);
        }

        console.log('Дані з JSON файлу перед оновленням:', jsonData);
        jsonData.age += 1; // Оновлення даних

        fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
        console.log('JSON файл оновлено:', jsonData);
        logMessage('JSON файл успішно оновлено.');
    } catch (err) {
        console.error('Помилка при роботі з JSON файлом:', err);
        logMessage(`Помилка при роботі з JSON файлом: ${err.message}`);
    }
}

writeFile();
readFile();
writeStream();
updateJsonFile();
