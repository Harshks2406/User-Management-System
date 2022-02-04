const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3535

const static_Path = path.join(__dirname,"./public")
const templatepath = path.join(__dirname,"public/templates/views")
const partialpath = path.join(__dirname,"public/templates/partials")

app.set('view engine','hbs')
app.set('views',templatepath)
hbs.registerPartials(partialpath)

app.get('/',(req,res)=>{
    res.render('index.hbs')
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

