//清单代码6-7 消息条目模型

const redis = require('redis')
const db = redis.createClient({
    host : '127.0.0.1',  
          no_ready_check: true,
          auth_pass: 'root',  
});

class Entry{

    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    save(cb) {
        const entryJson = JSON.stringify(this)
        db.lpush(
            'entries',
            entryJson,
            (err)=>{
                if(err) return cb(err)
                cb();
            }
        )
    }

    //代码清单6-8 获取一部分消息的逻辑
    static getRange(from, to, cb){
        db.lrange('entries', from, to, (err, items) => {
            if(err) return cb(err)
            let entries = []
            items.forEach((item)=>{
                entries.push(JSON.parse(item))
            })
            cb(null, entries)
        })
    }

}

module.exports = Entry;