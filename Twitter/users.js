var express = require('express');
var router = express.Router();
const Twitter = require('twitter-v2');
const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
});



/* GET users listing. */
router.get('/trends', async(req, res)=> {
  console.log('respond with a resource');
  const id = req.query.woeid
  
  // const trends = await client.get('https://api.twitter.com/2/tweets/search/stream/rules')
  // console.log("=====data",JSON.parse(trends))


  const stream =  client.stream('https://api.twitter.com/2/tweets/search/stream/rules');
  console.log(stream);

  // Close the stream after 30s.
setTimeout(() => {
  stream.close();
}, 30000);

// for  (const { data } of stream) {
//   console.log("=======")
//   console.log(data);
// }


});

const streamFactory = () => client.stream('https://api.twitter.com/2/tweets/search/stream/rules')
const dataConsumer =  (data) => console.log(JSON.parse(data))


router.get("/get", async  () => {
  try {
    console.log("==========here")
    for await (const { data } of  streamFactory()) {
    console.log("==========here222")

      dataConsumer(data);
    }
    // The stream has been closed by Twitter. It is usually safe to reconnect.
    console.log('Stream disconnected healthily. Reconnecting.');
    // listenForever(streamFactory, dataConsumer);
    // () => client.stream('tweets/search/s  tream')
    dataConsumer()
  } catch (error) {
    // An error occurred so we reconnect to the stream. Note that we should
    // probably have retry logic here to prevent reconnection after a number of
    // closely timed failures (may indicate a problem that is not downstream).
    console.warn('Stream disconnected with error. Retrying.', error);
    streamFactory()
    dataConsumer()
    // listenForever(streamFactory, dataConsumer);
  }
}

)


//  listenForever(
//   () => client.stream('tweets/search/s  tream'),
//   (data) => console.log(data)
// ) 



module.exports = router;
