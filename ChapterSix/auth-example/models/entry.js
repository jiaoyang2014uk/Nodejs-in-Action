//清单代码6-7 消息条目模型

const redis = require('redis')
const db = redis.createClient({
    url: 'redis://:root@127.0.0.1:6379' 
});
(async () => {
    db.on('error', (err) => console.log('Redis Client Error', err));
    await db.connect();
})()

class Entry{

    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    async save(cb) {
        const entryJson = JSON.stringify(this)
        await db.LPUSH('entries', entryJson)
        cb();
    }

    //代码清单6-8 获取一部分消息的逻辑
    static async getRange(from, to, cb){
        let items = await db.LRANGE('entries', from, to)
        let entries = []
        items.forEach((item)=>{
            entries.push(JSON.parse(item))
        })
        cb(null, entries)
    }

}

module.exports = Entry;