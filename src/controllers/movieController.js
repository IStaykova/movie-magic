const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const isOwner = movie.owner && movie.owner == req.user?._id;

    movie.rating = new Array(Number(movie.rating)).fill(true);
    res.render('movie/details', { movie, isOwner});
});

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const newMovie = { 
        ...req.body,
        owner: req.user._id,
    };

    try {
        await movieService.create(newMovie);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/create');
    }
}); 

router.get('/movies/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();
    res.render('movie/attach', {...movie, casts});
});

router.post('/movies/:movieId/attach', isAuth, async (req, res) => {
    const castId = req.body.cast;
    await movieService.attach(req.params.movieId, castId);

    res.redirect(`/movies/${req.params.movieId}/attach`);
});

router.get('/movies/:movieId/edit', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    res.render('movie/edit', { movie });
});

router.post('/movies/:movieId/edit', isAuth, async (req, res) => {
    
    const editedMovie = req.body;
    await movieService.edit(req.params.movieId, editedMovie);

    res.redirect(`/movies/${req.params.movieId}`); 
});

router.get('/movies/:movieId/delete', isAuth, async (req, res) => {
    await movieService.delete(req.params.movieId);
    res.redirect('/');
});


module.exports = router;