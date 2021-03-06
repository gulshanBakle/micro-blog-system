const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes}  = require('crypto');
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = 4000
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req,res)=>{
    res.send(posts)
});

app.post('/posts', async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id,title
    }
    await axios.post('http://event-bus-serv:4005/events/create',{
        type: 'PostCreated',
        data:{
            id,
            title
        }
    })

    res.status(201).send(posts[id])
});

app.post('/events',(req, res)=>{
    console.log('An event received of type: ', req.body.type)

    res.send({})
})

app.listen(PORT,()=>{
    console.log('This is the laetest from D-hub')
    console.log(`Listening to port ${PORT}`)
})