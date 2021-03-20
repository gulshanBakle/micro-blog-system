const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const PORT = 4003

app.post('/events', async (req, res)=>{
    const {type, data} = req.body
    if (type==='CommentCreated'){
        const status = data.content.includes('Doland') ? 'rejected' : 'approved'
        await axios.post('http://event-bus-serv:4005/events',{
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }
    res.send({})
})


app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})