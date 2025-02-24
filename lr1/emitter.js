const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('onMessage', (message) => {
    console.log(`Message received: ${message}`);
});

myEmitter.emit('onMessage', 'Hello, EventEmitter!');
