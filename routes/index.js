const express = require('express');
const router = express.Router();
const YTsearch = require('youtube-search');

const opts = {
    maxResults: 10,
    type: 'video',
    key: 'AIzaSyBnvqBZKLGn-TZPTyOaaCAjAldua-QmV9Y'
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'What Should pepe watch?'});
});

router.post('/query', function (req, res, next) {
    var searchQuery = req.body.query;

    YTsearch(searchQuery, opts, function (err, results) {
        res.json({results: results});
    })
});

module.exports = router;
