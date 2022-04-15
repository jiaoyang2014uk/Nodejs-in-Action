//代码清单9-1 待办事项列表的模型
class Todo {
    constructor(){
        this.todos = []
    }

    add(item){
        if(!item) throw new Error('add requires an item')
        this.todos.push(item)
    }

    deleteAll () {
        this.todos = []
    }

    getCount () {
        return this.todos.length
    }

    doAsync(cb){
        setTimeout(cb, 2000, true)
    }

}

module.exports = Todo


