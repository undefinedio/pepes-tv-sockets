const express = require('express');
const router = express.Router();
const YTsearch = require('youtube-search');

const opts = {
    maxResults: 10,
    type: 'video',
    key: 'AIzaSyBnvqBZKLGn-TZPTyOaaCAjAldua-QmV9Y'
};

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'What Should pepe watch?', home: true});
});

router.get('/overlay', (req, res) => {
    res.render('overlay', {title: 'What Should pepe watch?'});
});

router.post('/query', (req, res) => {
    console.log(req.body);
    YTsearch(req.body.message, opts, function (err, results) {
        res.json({results: results});
        global.magicSockets.send(req.body);
    })
});

module.exports = router;
