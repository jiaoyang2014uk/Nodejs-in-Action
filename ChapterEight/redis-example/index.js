//代码清单 8-14 连接到redis监听状态事件

// const redis = require('redis')

// const db = redis.createClient();
// db.on('connect', ()=>{console.log('connect')})
// db.on('ready', ()=>{console.log('ready')})
// db.on('error', (err)=>{console.log(err)})

// const { createClient } = require('redis');

// (async () => {
//   const client = createClient({
//     url: 'redis://:root@127.0.0.1:6379'
//   });

//   client.on('error', (err) => console.log('Redis Client Error', err));

//   await client.connect();

//   await client.set('key', 'value');
//   const value = await client.get('key');
// //   console.log(value, 'valiue')


//   const isExist = await client.exists('users')
// //   console.log('users exist', isExist)

// await client.set('users', ['alice', 'bob'])

// //代码清单8-15 将数据存在redis散列表中
// await client.HSET('camping', {
//     shelter: '2-person tent',
//     cooking: 'campstove'
// })

// const cooking  = await client.HGET('camping', 'cooking')
// // console.log(cooking, 'cooking')

// const hkeys = await client.HKEYS('camping')
// // console.log(hkeys, 'hkeys')

// await client.LPUSH('tasks', 'red')
// await client.LPUSH('tasks', 'green')
// const tasks = await client.LRANGE('tasks', 0, -1)
// console.log(tasks, 'tasks')

// await client.SADD('admins', 'alice');
// await client.SADD('admins', 'bob');
// await client.SADD('admins', 'alice');
// const members = await client.SMEMBERS('admins')
// console.log(members, 'members')


// })();

//代码清单8-16 用redis的订阅发布功能实现的聊天服务器
const net = require('net')
const redis = require('redis')

const server = net.createServer(socket=>{
    const subscriber = redis.createClient();
    subscriber.subscribe('main')
    subscriber.on('message', (channel, message)=>{
        socket.write(`channel ${channel}: message`)
    })

    const publisher = redis.createClient();
    socket.on('data', (data)=>{
        publisher.publish('main', data)
    })

    socket.on('end', ()=>{
        subscriber.unsubscribe('main')
        subscriber.end(true)
        publisher.end(true)
    })
})
server.listen(3002)