const express = require('express');
const router = express.Router();
const YTsearch = require('youtube-search');

const opts = {
    maxResults: 10,
    key: 'AIzaSyBnvqBZKLGn-TZPTyOaaCAjAldua-QmV9Y'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'What Should pepe watch?'});
});

router.post('/query', (req, res, next) => {
    let searchQuery = req.body.query;

    console.log(searchQuery);

    YTsearch(searchQuery, opts, (err, results) => {
        console.log('results', JSON.stringify(results));
        global.magicSockets.send(JSON.stringify(results));
        res.json({results: results});
    })
});

module.exports = router;
