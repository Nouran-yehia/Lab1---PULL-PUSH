const express = require (`express`);
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

const messages = [];

const responses = [];

app.post('/messages',(req, res)=>{
    const{body} = req;
    messages.push(body);
    res.status(204).end();
})

app.get('/messages', (req,res)=>{
    res.json(messages);
})

const subscribers = {};

app.post('/subscribers', (req,res)=>{
    const {id} = req.body;
    req.on('close', ()=> delete responses[id])
    responses[id] = res; 
})

app.post('/messageSubscribers',(req,res)=>
{
    const {body} = req;
    Object.keys(responses).forEach((subId) => {responses[subId].json(body)
    delete responses[subId];
          })
    res.status(204).end();
})

if (app.listen(5200))
console.log("listening to port 5200 \n http://localhost:5200/")

