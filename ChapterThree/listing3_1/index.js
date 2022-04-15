//代码清单3-1 RESTful路由示例

// const express = require('express')
// const app = express();
// const articles = [{title: 'example'}]

// app.set('port', process.env.PORT || 8000)

// //获取全部文章
// app.get('/articles', (req, res, next)=>{
//     res.send(articles)
// })

// //获取某个文章
// app.get('/articles/:id', (req, res, next) => {
//     const id  = req.params.id;
//     console.log('get articles by id', id)
//     res.send(articles[id])
// })

// //创建文章
// app.post('/articles', (req, res, next)=>{
//     res.send('ok')
// })

// //删除文章
// app.delete('/articles/:id', (req, res, next)=>{
//     const id = req.params.id;
//     console.log('delete articles by id', id)
//     delete articles[id]
//     // res.send('delete sucess')
//     res.send({message: 'deleted'})
// })

// app.listen(app.get('port'), ()=>{
//     console.log('app start at port ', app.get('port'))
// })

// module.exports = app;

// //代码清单3-2 添加消息体解析器
// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express();
// const articles = [{title: 'Example'}]

// app.set('port', process.env.PORT || 3000)

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// app.post('/articles', (req, res, next)=>{
//     const article = {title: req.body.title}
//     articles.push(article)
//     console.log(articles, 'artilces')
//     res.send(article)
// })

// app.listen(app.get('port'), ()=>{
//     console.log('app start at ', app.get('port'))
// })

//代码清单3-4 将Article模块添加到HTTP路由中

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const Article = require('./db').Article

// app.set('port', process.env.PORT || 3000)

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// app.get('/articles', (req, res, next) => {
//     Article.all((err, articles)=>{
//         if(err) return next(err)
//         res.send(articles)
//     })
// })

// app.get('/articles/:id', (req, res, next)=>{
//     const id = req.params.id
//     Article.find(id, (err, article)=>{
//         if(err) return next(err)
//         res.send(article)
//     })
// })

// app.delete('/articles/:id', (req, res, next)=>{
//     const id = req.params.id
//     Article.delete(id, (err)=>{
//         if(err) return next(err)
//         res.send({message: 'deleted'})
//     })
// })

// app.listen(app.get('port'), ()=>{
//     console.log('app start on', app.get('port'))
// })

// module.exports = app;

//代码清单3-5 生成可读的文章并保存
const express = require('express')
const app = express();
const Article = require('./db.js').Article
const read = require('node-readability')
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'))

app.get('/articles', (req, res, next)=>{
    Article.all((err, articles)=>{
        if(err) return next(err)
        // res.send(articles)
        res.render('articles.ejs', {articles: articles})
    })
})

app.get('/articles/:id', (req, res, next)=>{
    const id = req.params.id;
    Article.find(id, (err, article)=>{
        if(err) return next(err)
        res.send(article)
    })
})

app.post('/articles', (req, res, next)=>{
    const url = req.body.url;
    read(url, (err, result)=>{
        if(err || !result) res.status(500).send('Error downloading article')
        Article.create(
            {title: result.title, content: result.content}, 
            (err, article)=>{
            if(err) return next(err)
            res.send('ok')
        })
    })
})

app.delete('/articles/:id', (req, res, next)=>{
    const id = req.params.id;
    Article.delete(id, (err)=>{
        if(err) return next(err)
        res.send({message: 'deleted'})
    })
})

app.listen(app.get('port'), ()=>{
    console.log('app start on port', app.get('port'))
})

module.exports = app;