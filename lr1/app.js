console.log('Hello, Node.js!')

// app.js
const dateUtils = require('./dateUtils');


setTimeout(()=>
{
    console.log("Current Date: " + dateUtils.getCurrentDate());
})

setInterval(()=>
{
    console.log("Current Time: " + dateUtils.getCurrentTime());
},1000)

process.nextTick(() => {
    console.log("process.nextTick task");
});
