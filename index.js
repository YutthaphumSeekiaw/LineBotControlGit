const line = require('@line/bot-sdk')
const axios  = require('axios').default
const express =require('express')
const dotenv = require('dotenv')

const env = dotenv.config().parsed

// create LINE SDK config from env variables
const config = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN,
  };
  
  // create LINE SDK client
  const client = new line.Client(config);
  
  // create Express app
  // about Express itself: https://expressjs.com/
  const app = express();


// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  });
  
  // event handler
  function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
  
    //logic process
    

    

    // create a echoing text message
    // const echo = { type: 'text', text: event.message.text };
    const echo = { type: 'text', text: event.toString() };
  
    // use reply API
    return client.replyMessage(event.replyToken, echo);
  }
  
  // listen on port
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });