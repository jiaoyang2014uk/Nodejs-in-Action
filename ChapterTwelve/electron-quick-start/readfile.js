//代码清单12-1 简单的Node模块

const fs = require('fs');
module.exports = (cb) => {
    fs.readFile('./main.js', {encoding: 'utf-8'}, cb)
}