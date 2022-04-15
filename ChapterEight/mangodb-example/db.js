//代码清单8-10 用mongodb实现article api
const {MongoClient, ObjectId}  = require('mongodb')
let db;

module.exports = () => {
    return MongoClient
    .connect('mongodb://localhost:27017/articles')
    .then(client =>{
        db = client;
    })
}

module.exports.Article = {
    all () {
        return db.collection('articles2').find().sort({titile: 1}).toArray()
    },
    find(_id) {
        if(typeof _id !== 'string') _id = ObjectId(_id)
        return db.collection('articles2').findOne({ _id })
    },
    create (data) {
        return db.collection('articles2').insertOne(data, {w: 1})
    },
    delete(_id) {
        if(typeof _id !== 'string') _id = ObjectId(_id)
        return db.collection('articles2').deleteOne({ _id }, {w: 1})
    }
}