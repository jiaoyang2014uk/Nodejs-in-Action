//代码清单6-28 加载已登陆用户数据的中间件

const User = require("../models/user");

module.exports = (req, res, next) => {
    if(req.remoteUser) {
        res.locals.user = req.remoteUser
    }
    const uid = req.session.uid
    if(!uid) return next()
    User.get(uid, (err, user)=>{
        if(err) return next(err)
        req.user = res.locals.user = user
        next();
    })
}