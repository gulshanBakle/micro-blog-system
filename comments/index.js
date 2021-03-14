const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto')
const axios = require('axios')
const cors = require('cors');

const app = express();
const PORT = 4001
app.use(bodyParser.json())
app.use(cors())

const commentsByPost = {}

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPost[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body;
    const comments = commentsByPost[req.params.id] || []
    comments.push({id:commentId, content, status:'pending'})

    commentsByPost[req.params.id] = comments

    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data:{
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })  
    res.status(201).send(comments)
})

app.post('/events', async (req, res)=>{
    console.log('An event received of type: ', req.body.type)

    const {type, data} = req.body
    if (type === 'CommentModerated'){
        const {id, postId, status, content} = data
        const comments = commentsByPost[postId]

        const comment = comments.find(comment=>{
            return comment.id===id
        })
        comment.status = status
        await axios.post('http://localhost:4005/events',{
            type: 'CommentUpdated',
            data:{
                id, postId, status, content
            }
        })
    }

    res.send({})
})
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})