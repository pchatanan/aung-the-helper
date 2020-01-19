const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const CHANNEL_ACCESS_TOKEN = 'P7uL0Q1mIYyyc7L5EEvvX72qK1RLu2ZPXTdoExnSeyrV/feFIiPJYLligSw6h+7dyHChyxwSU892EmEkOM83REoGwRBryffrvngnfTXiaDtoWUqHzu4s+YdzyPYagfAiK6XSO0evYtSZ3FjAScpABwdB04t89/1O/w1cDnyilFU='
const CHANNEL_SECRET = 'db0087ecfa5c880489c2fe70518cd335'
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));
app.get('/ping', (req, res) => {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const config = {
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET
}

app.post('/webhook', line.middleware(config), (req, res) => {
Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
}

return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
});
}


app.listen(port, () => {
    console.log("Server is up!")
});