//代码清单8-8 连接mongodb
// const { MongoClient } = require('mongodb')

// MongoClient.connect('mongodb://localhost:27017/articles')
//     .then(db=>{
//         console.log('client ready')
//         // db.close();
        
//         //代码清单8-9 插入文档
//         const article = {
//             title: 'i like cake',
//             content: 'it is quite good'
//         }
//         db.collection('articles')
//             .insertOne(article)
//             .then(result=>{
//                 console.log(result.insertedID)
//                 console.log(article._id)
//             })
//     }, console.error)



const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
  
    const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
    // console.log('Inserted documents =>', insertResult);

    const article = {
        title: 'i like cake',
        content: 'it is quite good'
    }
    const result = await collection.insertOne(article)
    // console.log(result)
    // console.log(article)

    const findResult = await collection.find({title: 'i like cake'}).toArray();
    // console.log('Found documents =>', findResult);

    const filteredDocs = await collection.findOne({ _id: new ObjectId("624af5a356444cc80f69cef7")});
    console.log('Found documents filtered by { _id:  624af5a356444cc80f69cef7 } =>', filteredDocs)
  
    return 'done.';
  }

  main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

