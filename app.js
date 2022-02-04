const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3535
const dotenv = require("dotenv");
dotenv.config({path:'config.env'});
const connectDB = require('./src/db/connect')
var Userdb = require('./src/models/user')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const static_Path = path.join(__dirname,"./public")
const templatepath = path.join(__dirname,"public/templates/views")
const partialpath = path.join(__dirname,"public/templates/partials")

app.set('view engine','hbs')
app.set('views',templatepath)
hbs.registerPartials(partialpath)
app.use(express.static(static_Path))

connectDB();

app.get('/',(req,res)=>{
    res.render('index.hbs')
})

app.get('/newUser',(req,res)=>{
    res.render('newUser.hbs')
})

app.get('/updateUser',(req,res)=>{
    res.render('updateUser.hbs')
})

app.post('/newUser',(req,res)=>{
    console.log(req.body)
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"})
        return
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    user
        .save(user)
        .then(data=>{
            res.send(data)
        })
        .catch((err)=>{
            res.status(500).send({message: err.message || "Some error occured while creating a create operation"})
        })
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
