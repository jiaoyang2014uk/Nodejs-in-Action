//代码清单7-5 把模版代码放在文件中
const ejs = require('ejs')
const fs = require('fs')
const http = require('http')

const students = [
    {name: 'tom', age: 23},
    {name: 'bob', age: 24},
    {name: 'alice', age: 25},
]
const filename = './templates/students.ejs'

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        fs.readFile(filename, (err, data)=>{
            let context = data.toString()
            let output = ejs.render(context, { students })
            res.setHeader('Content-Type', 'text/html')
            res.end(output)
        })
    } else {
        res.statusCode = 404
        res.end('not found')
    }
})
server.listen(8000)