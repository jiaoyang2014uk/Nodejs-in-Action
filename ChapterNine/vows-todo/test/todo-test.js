//代码清单9-13 用vows测试代办事项程序
const vows = require('vows')
const assert = require('assert')
const Todo = require('./../todo')
vows.describe('todo').addBatch({
    'when adding an item': {
        topic: ()=>{
            const todo = new Todo();
            todo.add('feed my cat')
            return todo
        },
        'it should exits in my todos': (err, todo)=>{
            assert.equal(todo.getCount(), 1)
        }
    }
}).export(module)
