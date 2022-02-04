const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3535
const dotenv = require("dotenv");
const bodyparser = require('body-parser')
dotenv.config({path:'config.env'});
const connectDB = require('./src/db/connect')
var Userdb = require('./src/models/user')
const axios = require('axios')

app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}))
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
    axios.get('http://localhost:3535/find')
     .then(function(response){
        res.render('index.hbs',{users:response.data})
     })
     .catch(err=>{
         res.send(err)
     })
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
            res.status(200).redirect('/')
        })
        .catch((err)=>{
            res.status(500).send({message: err.message || "Some error occured while creating a create operation"})
        })
})

//Both of them are correct

// app.post('/newUser',async(req,res)=>{
//     try {
//         const user = new Userdb(req.body)
//         console.log(user)
//         result = await user.save()
//         console.log(result)
//         res.status(201).render('index.hbs')
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

app.get('/find',(req,res)=>{
    Userdb.find()
     .then(user=>{
        res.send(user)
     })
     .catch(err=>{
         res.status(500).send({message: err.message || "Error occured"})
     })
})

app.get('/delete',(req,res)=>{
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
     .theh(data=>{
         if(!data){
             res.status(404).send({message:`Cannot delete with id ${id}. Maybe id is wrong`})
         }else{
             res.send({message: "User was deleted successfully"})
         }
     })
     .catch(err=>{
         res.status(500).send({message: `Could not delete user with id ${id}`})
     })
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
