const express = require('express')
const app = express();
const port  = process.env.PORT || 8000
app.get('/', (req, res)=>{
    res.send('hello express')
})

app.listen(port, () => {
    console.log(`app server listen at localhost:// ${port}`)
})