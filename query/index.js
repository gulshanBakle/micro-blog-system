const express =require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 4002
const posts = {}

const handleEvents=(type, data)=>{
    if (type==='PostCreated'){
        const {id, title} = data
        posts[id] = {id, title, comments: []}

    }
    if (type==='CommentCreated'){
        const {id, content, postId, status} = data
        const post = posts[postId]
        post.comments.push({id, content, status})
    }
    console.log(posts)
    if (type==='CommentUpdated'){
        const {id, postId, content, status} = data
        comments = posts[postId].comments
        const comment = comments.find(comment=>{
            return comment.id ===id
        })
        comment.status = status
        comment.content = content
    }
}

app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/events',(req,res)=>{
    const {type, data} = req.body
    handleEvents(type, data)
    res.send({})
})

app.listen(PORT, async ()=>{
    console.log(`Listening at port ${PORT}`)

    const res = await axios.get('http://event-bus-serv:4005/events')
    for (let e of res.data){
        console.log('Processing event: ', e.type)
        handleEvents(e.type, e.data)
    }
})