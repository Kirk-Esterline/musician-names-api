const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT || 8000
const uri = process.env.MONGO_DB_STRING;

let db 
let musiciansCollection

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

    
        
    app.post('/musicians', (req,res) => {
        musiciansCollection
            .insertOne({stageName: req.body.stageName, birthName: req.body.birthName, age: req.body.age, likes: 0})
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        musiciansCollection
            .find()
            .toArray()
            .then(results => {
                res.render('index.ejs', { musicians: results })
            })
        .catch(error => console.error(error))
    })
    
    app.put('/musicians', (req,res) => {
        console.log(req.body)
        musiciansCollection
            .findOneAndUpdate(
                { stageName: req.body.currentStageName},
                {
                    $set: {
                        stageName: req.body.updatedStageName,
                        birthName: req.body.updatedBirthName,
                        age: req.body.updatedAge,
                    }
                },
                {
                    upsert: false,
                })
            .then(result => {
                console.log(result)
            })
            .catch(error => console.error(error))
    })

    app.put('/addOneLike', (req, res) => {
        console.log(req.body)
        stageName = req.body.stageName
        musiciansCollection
            .findOneAndUpdate(
                { stageName: req.body.stageName},
                {
                    $inc: {
                        likes: 1
                    }
                },
                {
                    upsert: false,
                })
                .then(result => {
                    console.log(`Like added to ${stageName}`)
                    res.json(`Like added to ${stageName}`)
                })
                .catch(error => console.error(error))
    })

    app.put('/removeOneLike', (req, res) => {
        console.log(req.body)
        stageName = req.body.stageName
        musiciansCollection
            .findOneAndUpdate(
                { stageName: req.body.stageName},
                {
                    $inc: {
                        likes: -1
                    }
                },
                {
                    upsert: false,
                })
                .then(result => {
                    console.log(`Like removed from ${stageName}`)
                    res.json(`Like removed from ${stageName}`)
                })
                .catch(error => console.error(error))
    })

    app.delete('/deleteMusician', (req, res) => {
        console.log(req.body)
        stageName = req.body.stageName
        musiciansCollection
            .deleteOne(
                { stageName: req.body.stageName }
            )
            .then(result => {
                console.log(`${stageName} was deleted`)
                res.send(`${stageName} was deleted`)
            })
            .catch(error => console.error(error))
    })

MongoClient.connect(uri)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db('Musicians2')
        musiciansCollection  = db.collection('musicians')
    })
    app.listen(PORT,() => {
        console.log(`The server is running on port ${PORT}! You better go catch it...`)
    })

    