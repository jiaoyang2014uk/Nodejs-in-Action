// const app = require('connect')();
// app.use((req, res, next)=>{
//     res.end('hello world')
// })
// app.listen(3000)

//代码清单6-1 使用多个connect中间件

// const connect = require('connect');
// function logger (req, res, next) {
//     console.log('%s %s', req.method, req.url)
//     next();
// }

// function hello (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('hello world')
// }

// connect()
// .use(logger)
// .use(hello)
// .listen(3000)

// //代码清单6-2 错误:hello中间件组件在logger组件前面

// const connect = require('connect');
// function logger (req, res, next) {
//     console.log('%s %s', req.method, req.url)
//     next();
// }

// function hello (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('hello world')
// }

// connect()
// .use(hello)
// .use(logger)
// .listen(3000)

// //代码清单6-3 可配置的connect中间件logger
// const connect = require('connect')
// const app = connect();
function setup(format){
    const reg = /:(\w+)/g

    return function createLogger(req, res, next) {
        const str = format.replace(reg, (string, property)=>{
            console.log(string, 'string')
            console.log(property, 'property')
            return req[property];
        })
        console.log(str, 'str')
        next()
    }
}
// function hello(req, res){
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('hello world')
// }
// app.use(setup(':method :url'))
//     .use(hello)
//     .listen(3000)

env = process.env.NODE_ENV || 'development'

//代码清单6-4 connect中的错误处理中间件
function errorHander(err, req, res, next) {
    res.statusCode = 500
    switch(env){
        case 'development': 
            console.error("Error:")
            console.error(err)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(err))
            break;

        default:
            res.end('Server error')
            break;
    }
}

const connect = require('connect')
connect()
.use(setup(':method :url'))
.use((req, res) => {
    foo();
    res.setHeader('Content-Type', 'text\plain')
    res.end('hello world')
})
// .use(setup(':method :url'))
.use(errorHander)
.listen(3000)