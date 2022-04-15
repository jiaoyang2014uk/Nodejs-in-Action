const Entry = require("../models/entry");

exports.form = (req, res) => {
    res.render('post', {title: 'Post'})
}

//代码清单6-10 用表单提交的数据创建新消息
exports.submit = (req, res, next) => {
    const data = req.body.entry;
    const user = res.locals.user;
    const username = user ? user.name : null

    const entry = new Entry({
        username: username,
        title: data.title,
        body: data.body
    })
    entry.save((err)=>{
        if(err) return next(err)
        if(req.remoteUser){
            res.json({message: 'Entry added'})
        } else {
            res.redirect('/')
        }
    })
}

//代码清单6-11 消息列表
exports.list = (req, res, next) => {
    Entry.getRange(0, -1, (err, entries)=>{
        if (err) return next(err)
        res.render('entries', {
            title: 'Entries',
            entries: entries
        })
    })
}