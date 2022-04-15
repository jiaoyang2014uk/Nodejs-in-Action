//代码清单7-2 博客程序的文件解析逻辑
const fs = require('fs')
const http = require('http')
const ejs = require('ejs')

function getEntries() {
    let entriesRaw = fs.readFileSync('./entries.txt', 'utf8')
    let entriesRaws = entriesRaw.split('---')
    let entries = []
    entriesRaws.map((entryRaw)=>{
        const entry = {}
        let lines = entryRaw.split('\n')
        lines.map((line)=>{
            if (line.indexOf('title: ') === 0) {
                entry.title = line.replace('title: ' , '')
            } else if (line.indexOf('date: ') === 0) {
                entry.date = line.replace('date: ' , '')
            } else {
                entry.body = entry.body || ''
                entry.body += line
            }
        })
        entries.push(entry)
    })
    return entries
}

const entries = getEntries()
console.log(entries, 'entries')

const server = http.createServer((req, res)=>{
    const output = blogPage(entries)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(output)
})

server.listen(8000)

//代码清单7-3 模版引擎把展示细节和程序逻辑分开
// function blogPage (entries) {
//     let output = `
//     <html>
//         <head>
//             <style type='text/css'>
//             .entry_title { font-weight: bold; }
//             .entry_date { font-style: italic; }
//             .entry_body { margin-bottom: 1em; }
//             </style>
//         </head>
//         <body>
//     `

//     entries.map((entry)=>{
//         output += `
//         <div class='entry_title'>${entry.title}</div>
//         <div class='entry_date'>${entry.date}</div>
//         <div class='entry_body'>${entry.body}</div>
//         `
//     })
//     output += `</body></html>`
//     return output
// }

const template = fs.readFileSync('./templates/blog_page.ejs', 'utf8')

function blogPage(entries) {
    const value = {entries}
    return ejs.render(template, value)
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           