//代码清单6-5 极简的express程序

const express = require('express')
const app = express();

app.get('/', (req, res)=>{
    res.send('hello express')
})
app.listen(3000)

