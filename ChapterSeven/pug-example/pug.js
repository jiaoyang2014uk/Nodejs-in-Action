// const pug = require('pug')
// const template = 'strong #{message}'
// const context = {message: 'hello world'}
// const fn = pug.compile(template)
// console.log(fn(context)) 

// const pug = require('pug')
// const template = 'strong #{message}'
// const context = {message: 'hello world'}
// const fn = pug.compile(template)
// console.log(fn(context)) 

// const fs = require('fs')
// const pug = require('pug')
// const template = fs.readFileSync('./template.pug')
// const context = {messages: [
//     'you have logged in sucessfuly',
//     'welcome back'
// ]}
// const fn = pug.compile(template)
// console.log(fn(context)) 

//代码清单7-10 模版继承实战
const fs = require('fs')
const pug = require('pug')
const templateFile = './templates/page.pug'
const template = fs.readFileSync(templateFile)
const context = {messages: [
    'you have logged in sucessfuly',
    'welcome back'
]}
const fn = pug.compile(template, {filename: templateFile})
console.log(fn(context)) 