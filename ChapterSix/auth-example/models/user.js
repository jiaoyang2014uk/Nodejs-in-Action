//代码清单6-15 开始创建用户模型
const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient({
    url: 'redis://:root@127.0.0.1:6379'
});
(async () => {
    db.on('error', (err) => console.log('Redis Client Error', err));
    await db.connect();
})()

class User {
    constructor(obj){
        for(let key in obj){
            this[key] = obj[key]
        }
    }
    
    //代码清单6-16 更新用户记录
    async save(cb) {
        if(this.id) {
            this.update(cb)
        } else {
            this.id = await db.incr('user:ids')
            this.hashPassword((err)=>{
                if(err) return cb(err)
                this.update(cb)
            })
        }
    }

    async update(cb) {
        const id = this.id
        await db.set(`user:id:${this.name}`, id)
        await db.HSET(`user:${id}`, this)
        cb();
    }

    //代码清单6-17 在用户清单中添加bcrypt加密函数
    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt)=>{
            if(err) return cb(err)
            this.salt = salt
            bcrypt.hash(this.pass, salt, (err, hash)=>{
                if(err) return cb(err)
                this.pass = hash
                cb()
            })
        })
    }

    //代码清单6-20 从redis中取得用户数据
    static getByName(name, cb) {
        User.getId(name, (err, id)=>{
            if(err) return cb(err)
            User.get(id, cb)
        })
    }

    static async getId (name, cb) {
        let id =  await db.get( `user:id:${name}`)
        cb(null, id)
    }

    static async get(id, cb) {
        let user = await db.HGETALL(`user:${id}`)
        cb(null, new User(user))
    }

    //代码清单6-21 用户名和密码认证
    static auth (name, pass, cb) {
        User.getByName(name, (err, user)=>{
            if(err) return cb(err)
            if(!user.id) return cb()
            bcrypt.hash(pass, user.salt, (err, hash)=>{
                if(err) return cb(err)
                if(hash === user.pass) return cb(null, user)
                cb()
            }) 
        })
    }

    toJSON () {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = User;

//代码清单6-18 测试用户模型
// const User = require('./user')
// const user = new User({
//     name:'Example',
//     pass: 'test'
// })

// user.save((err)=>{
//     if(err) console.error(err)
//     console.log('user id %d', user.id)
// })

// User.getByName('Example', (err, user) =>{
//     console.log(user)
// })

// User.auth('Example', 'test', (err, user)=>{
//     console.log(user, 'user')
// })