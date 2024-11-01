const express = require('express');
const router = express.Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');

router.use(homeController);
router.use(movieController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;