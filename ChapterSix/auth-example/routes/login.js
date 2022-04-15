const User = require("../models/user");

exports.form = (req, res) => {
    res.render('login', {title: 'Login'})
}

//代码清单6-26 处理登陆的路由
exports.submit = (req, res, next) => {
    const data = req.body.user
    User.auth(data.name, data.pass, (err, user)=>{
        if(err) return next(err)
        if(user) {
            req.session.uid = user.id;
            res.redirect('/')
        } else {
            res.error('invaild auth')
            res.redirect('back')
        }
    })
}

exports.logout = (req, res) => {
    req.session.destroy(err=>{
        if(err) throw err
        res.redirect('/')
    })
}