//代码清单6-15 开始创建用户模型
const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient({
    url: 'redis://:root@127.0.0.1:6379'
});

(async () => {
    db.on('error', (err) => console.log('Redis Client Error', err));
    db.connect();
})()



class User {
    constructor(obj){
        for(let key in obj){
            this[key] = obj[key]
        }
    }
    
    //代码清单6-16 更新用户记录
    save(cb) {
        if(this.id) {
            this.update(cd)
        } else {
            (async () => {
                this.id = await db.incr('user:ids');
                this.hashPassword((err)=>{
                    if(err) return cb(err)
                    this.update(cb)
                })
                cb()
            }) ()
        }
    }

    update() {
        (async () => {
            const id = this.id
            await db.set(`user:id:${this.name}`, id)
            await db.HSET(`user:${id}`, this)
        })()
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
}


// module.exports = User;

// const User = require('./user')
const user = new User({
    name:'Example',
    pass: 'test'
})

user.save((err)=>{
    if(err) console.error(err)
    console.log('user id %d', user.id)
})