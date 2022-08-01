var express = require('express');
const gettweets = require ('./twitter')
const gethashtags  =  require ('./hastag')
var router = express.Router();

/* GET home page. */
router.get('/get-tweets',gettweets)
router.get('/get-hashtags',gethashtags)

module.exports = router;
