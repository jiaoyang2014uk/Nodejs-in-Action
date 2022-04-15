// const async = require('async')

// async.series([
//     cb=> {
//         setTimeout(() => {
//             console.log('I run first')
//             cb();
//         }, 1000);
//     },
//     cb=> {
//         setTimeout(() => {
//             console.log('I run second')
//             cb();
//         }, 500);
//     },
//     cb=> {
//         setTimeout(() => {
//             console.log('I run third')
//             cb();
//         }, 100);
//     },
// ])

//代码清单2-19 
const async = require('async')
const exec = require('child_process').exec

function download(version, dest, cb) {
    const url =`http://nodejs.org/dist/v${version}/node-v${version}.tar.gz`
    const path = `${dest}/${version}.tgz`
    exec(`curl ${url} > ${path}`, cb)
}

async.series([
    cb => {
        async.parallel([
            cb=>{
                console.log('download 4.4.7')
                download('4.4.7', '/tmp', cb)
            },
            cb=>{
                console.log('download 6.3.0')
                download('6.3.0', '/tmp', cb)
            }
        ], cb)
    }, 
    cb => {
        console.log('archieve....')
        exec('tar -cvf node_distros.tar /tmp/4.4.7.tgz /tmp/6.3.0.tgz', err => {
            if (err) throw err
            console.log('done')
            cb();
        })
    }
], (err, result)=>{
    if (err) throw err
    console.log(result)
})