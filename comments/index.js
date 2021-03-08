const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto')
const cors = require('cors');

const app = express();
const PORT = 4001
app.use(bodyParser.json())
app.use(cors())

const commentsByPost = {}

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPost[req.params.id] || [])
})

app.post('/posts/:id/comments', (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body;
    const comments = commentsByPost[req.params.id] || []
    comments.push({id:commentId, content})

    commentsByPost[req.params.id] = comments
    res.status(201).send(comments)
})
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})