const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8000
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri)
const db = client.db('Musicians2')
const musiciansCollection = db.collection('musicians')

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
        db.collection('musicians')
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
    
    // .catch(error => console.error(error))

client.connect(err => {
    if(err){console.error(err); return false;}
    
    console.log('Connected to Database')
    
    app.listen(PORT ,() =>{
        console.log(`The server is running on port ${PORT}! You better go catch it...`)
    })
})
    