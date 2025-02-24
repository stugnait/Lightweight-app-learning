function getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString();
}

function getCurrentTime() {
    const date = new Date();
    return date.toLocaleTimeString();
}

module.exports = { getCurrentDate, getCurrentTime };
