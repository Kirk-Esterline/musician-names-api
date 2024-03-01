const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://kirkesterline:FxViYSOIP6BfHHIY@musicians2.qgkw14k.mongodb.net/?retryWrites=true&w=majority&appName=Musicians2')
    .then(client => {
        console.log('Connected to Database')
    })
    .catch(error => console.error(error))
    
//Mongodb password: FxViYSOIP6BfHHIY

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const rappers = {
    "21 savage": {
        'age':29,
        'birthname':'Sheyaa Bin Abraham-Joseph',
        'birthlocation': 'London, England',
    },
    "chance the rapper": {
        'age':29,
        'birthname':'Chancelor Bennett',
        'birthlocation': 'Chicago, Illinois',
    },
    "dylon": {
        'age':29,
        'birthname':'Dylon',
        'birthlocation': 'Dylon, Dylon',
    },
    "unknown": {
        'age': 0,
        'birthname': 'unknown',
        'birthlocation': 'unknown',
    }
}

app.post('/musicians', (req,res) => {
    console.log(req.body)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:rapperName', (req, res) => {
    console.log(req.body)
    // const rappersName = req.params.rapperName.toLowerCase()
    // if(rappers[rappersName]){
    //     res.json(rappers[rappersName])
    // } else {
    //     res.json(rappers['unknown'])
    // }
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`The server is running on port ${PORT}! You better go catch it...`)
})