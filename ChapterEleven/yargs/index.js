#!usr/bin/env node
//代码清单11-1 用yargs解析命令行参数

// const readFile = require('fs').readFile;
// const yargs = require('yargs')

// const argv = yargs.demand('f')
// .nargs('f',1)
// .describe('f', 'JSON file to prase')

// const file = argv.f;
// readFile(file, (err, dataBuffer)=>{
//     const value = JSON.parse(dataBuffer.toString())
//     console.log(JSON.stringify(value))
// })

//代码清单11-2 从stdin读取文件
const concat = require('mississippi').concat;
const readFile = require('fs').readFile;
const yargs = require('yargs')

const argv = yargs
.usage('parse-json [options]')
.help('h')
.alias('h', 'help')
.demand('f')
.nargs('f',1)
.describe('f', 'JSON file to prase')

const file = argv.f;


function parse(str){
    const value = JSON.parse(str)
    console.log(JSON.stringify(value))
}

if(file === '-'){
    process.stdin.pipe(concat(parse))
} else {
    readFile(file, (err, dataBuffer)=>{
        if(err) return err
        parse(dataBuffer.toString())
    })
}