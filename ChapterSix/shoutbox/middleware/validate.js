//代码清单6-13 两个更具潜力但仍不完美的校验中间件

// function requireEntryTitle (req, res, next) {
//     const title  = req.body.entry.title
//     if(title) {
//         next()
//     } else {
//         res.send('title is required')
//         res.redirect('back')
//     }
// }

// function requireEntryTitleLengthAbove (len) {
//     return (req, res, next) => {
//         const title  = req.body.entry.title
//         if(title.length > len) {
//             next()
//         } else {
//             res.send(`title must be longer than ${len}`)
//             res.redirect('back')
//         }
//     }
// }

// exports.requireEntryTitle = requireEntryTitle;
// exports.requireEntryTitleLengthAbove = requireEntryTitleLengthAbove

//代码清单6-14 校验中间件的实现

function parseField(field){
    return field.split(/\[|\]/).filter(s=>s)
}

function getField(req, field) {
    let val = req.body
    field.forEach(prop=>{
        val = val[prop];
    })
    return val
}

exports.required = (field) => {
    field = parseField(field)
    return (req, res, next) => {
        if(getField(req, field)) {
            next()
        } else {
            res.send(`${field.join(' ')} is required`)
            res.redirect('back')
        }
    }
}

exports.lengthAbove = (field, len) => {
    field = parseField(field)
    return (req, res, next) => {
        if(getField(req, field).length > len) {
            next()
        } else {
            res.send(`${field.join(' ')} must be longer than ${len} charters`)
            res.redirect('back')
        }
    }
}