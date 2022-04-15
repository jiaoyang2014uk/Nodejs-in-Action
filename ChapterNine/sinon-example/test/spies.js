//代码清单9-18 使用探测器
const sinon = require('sinon')
const DataBase = require('./db')
const fs = require('fs')
const dataBase = new DataBase('./sample.json')

const spy = sinon.spy(fs, 'writeFile')
const saveDone = sinon.spy();

dataBase.inset('name', 'alice')
dataBase.save(saveDone)

sinon.assert.calledOnce(spy)

fs.writeFile.restore()