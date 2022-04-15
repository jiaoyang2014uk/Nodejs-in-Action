// const ejs = require('ejs')
// const template = '<%= message %>'
// const context = {message: 'hello world'}
// console.log(ejs.render(template, context))

// const ejs = require('ejs')
// const template = '<%= message %>'
// const context = {message: "<script>alert('xss attack!');</script>"}
// console.log(ejs.render(template, context))

// const ejs = require('ejs')
// const template = '<%- message %>'
// const context = {message: "<script>alert('trusted js!');</script>"}
// console.log(ejs.render(template, context))

const ejs = require('ejs')
ejs.delimiter = '$'
const template = '<$= message $>'
const context = {message: 'hello world'}
console.log(ejs.render(template, context))