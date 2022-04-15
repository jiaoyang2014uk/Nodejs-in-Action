//代码清单9-17 数据库类
const fs = require('fs')

class DataBase {
    constructor(filename){
        this.filename = filename;
        this.data = {}
    }

    save(cb){
        fs.writeFile(this.filename, JSON.stringify(this.data), cb)
    }

    inset (key, value) {
        this.data[key] = value;
    }
}

module.exports = DataBase;