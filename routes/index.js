const express          = require('express');
const router           = express.Router();
const fetch            = require('node-fetch');
const passportFacebook = require('../helpers/facebook');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movies', (req, res, next) => {
  fetch('https://api.themoviedb.org/3/genre/28/movies?api_key=82b5663c68f2ad62437a48269129ca36&language=es&include_adult=false&sort_by=created_at.asc')
  .then(results => results.json())
  .then(movies => {
    res.render('movies', movies); 
  });
});

router.get('/movies/:id', (req, res, next) => {
  const id =  req.params;
  fetch(`https://api.themoviedb.org/3/movie/${id.id}?api_key=82b5663c68f2ad62437a48269129ca36&language=en_US`)
  .then(result => result.json())
  .then(movie => {
    console.log(movie);
    res.render('detail', movie);
  })
});

router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/movies');
});

module.exports = router;

