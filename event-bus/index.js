const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const PORT = 4005
const events = []

app.post('/events', (req,res)=>{
    const event = req.body
    events.push(event)
    axios.post('http://posts-clusterip-serv:4000/events', event).catch((err)=>{
        console.log(err.message)
    })
    axios.post('http://comments-clusterip-serv:4001/events', event).catch((err)=>{
        console.log(err.message)
    })
    axios.post('http://query-clusterip-serv:4002/events', event).catch((err)=>{
        console.log(err.message)
    })
    axios.post('http://moderation-clusterip-serv:4003/events', event).catch((err)=>{
        console.log(err.message)
    })
    
    res.send({status: 'Event sent to services'})
})

app.get('/events', (req,res)=>{
    res.send(events)
})

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})