// const hogan = require('hogan.js')
// const templateSource = '{{message}}'
// const context = {message: 'hello world'}
// const template = hogan.compile(templateSource)
// console.log(template.render(context))

//代码清单7-8 在hogan中使用lambda
// const hogan = require('hogan.js')
// const md = require('github-flavored-markdown')
// const templateSource = `{{#markdown}}**name**: {{name}}{{/markdown}}`
// const context = {
//     name: 'nick',
//     markdown: () => (text) => md.parse(text)
// }
// const template = hogan.compile(templateSource)
// console.log(template.render(context))

//代码清单7-9 在hogan中使用子模版
const hogan = require('hogan.js')
const studentTemplate = `
<p>
name: {{name}}
age: {{age}} years old
</p>
`
const mainTemplate = `
{{#students}}
{{>student}}
{{/students}}
`
const context = {
    students: [
        {name: "Alice", age: 21},
        {name: "Edward", age: 22}
    ]
}

const template = hogan.compile(mainTemplate)
const partical = hogan.compile(studentTemplate)
const html = template.render(context, {student: partical})
console.log(html)
