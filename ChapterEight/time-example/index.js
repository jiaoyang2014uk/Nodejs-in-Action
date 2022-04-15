//代码清单8-22 序列化的性能基准测试
const bytes = require('pretty-bytes')
const obj = {}
for (let i = 0; i < 200000; i++) {
    obj[i] = {
        [Math.random]: Math.random()
    }
}
console.time('serialise')
const jsonString = JSON.stringify(obj)
console.timeEnd('serialise')
console.log('size', bytes(Buffer.byteLength(jsonString)))
console.time('deserialise')
const obj2 = JSON.parse(jsonString)
console.timeEnd('deserialise')

