const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const PORT = 4005

app.post('/events', (req,res)=>{
    const event = req.body

    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
    
    res.send({status: 'Event sent to services'})
})

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})