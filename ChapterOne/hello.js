// console.log('hello from node.js');

//代码清单1-2 用Node的http模块写的Hello World
const http = require('http');
const port = 8080;      

const server = http.createServer((req, res)=>{
    res.end('hello world');
})

server.listen(port, ()=>{
    console.log('localhost: %s', port)
});