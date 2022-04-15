const User = require("../models/user");

exports.form = (req, res) => {
    res.render('register', {title: 'Register'})
}

//代码清单6-24 用提交的数据创建用户
exports.submit = (req, res, next) => {
    const data = req.body.user
    User.getByName(data.name, (err, user)=>{
        if(err) return next(err)
        if (user.id) {
            res.error('user name has been token')
            res.redirect('back')
        } else {
            user = new User({
                name: data.name,
                pass: data.pass
            })

            user.save((err)=>{
                if(err) return next(err)
                req.session.uid = user.id
                res.redirect('/')
            })
        }   
        
    })
}