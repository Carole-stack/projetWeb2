const express = require('express');
const fs = require('fs')
const router = express.Router;

router.length('/', (req, res) => {
    let html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
    res.send(html);
});

module.exports = router;
