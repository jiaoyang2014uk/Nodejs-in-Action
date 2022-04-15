//代码清单5-2 基本的hapi服务器

// const Hapi = require('hapi')
// const server = new Hapi.Server();

// server.connection({
//     host: 'localhost',
//     port: 8000
// })

// server.start((err)=>{
//     if(err) {
//         throw err
//     }
//     console.log('server run at ', server.info.uri)
// })

//代码清单5-3 hapi的入门服务器

// const Hapi = require('hapi')
// const server = new Hapi.Server({
//     host: 'localhost',
//     port: 8000
// });

// // server.connection({
// //     host: 'localhost',
// //     port: 8000
// // })

// server.route({
//     method: 'GET',
//     path: '/hello',
//     handler: (req, rep)=>{
//         return  'hello hapi'
//     }
// })

// server.start((err)=>{
//     if(err){
//         throw err
//     }
    
// })

// console.log('server running at', server.info.uri)

//代码清单5-4 用hapi添加插件

const Hapi = require('hapi')
const Inert = require('inert')
const server = new Hapi.Server({
    host: 'localhost',
    port: 8000
})

server.register(Inert, {
    routes: {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: true,
                redirectToSlash: true
            }
        }
    }
})

server.start((err)=>{
    if(err) throw err 
})

console.log('server runing at ', server.info.uri)



