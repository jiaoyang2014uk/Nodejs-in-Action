//代码清单1-3 一个Node Web应用程序
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('hello express web app');
});

app.listen(3000, ()=>{
    console.log('express web app on localhost 3000');
})