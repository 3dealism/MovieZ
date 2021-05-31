const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

/**
 * Checks for the validity of the mime type
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type (undefined)");
    if (isValid) {
      console.log('Mimetype is valid!');
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

/**
 * Adds a movie to the database
 */
router.post('', checkAuth, multer({storage: storage}).single('poster'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
    posterPath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
  });
  movie.save().then(createdMovie => {
    res.status(201).json({
      message: 'Movie added!',
      movie: {
        id: createdMovie._id,
        title: createdMovie.title,
        director: createdMovie.director,
        genre: createdMovie.genre,
        year: createdMovie.year,
        posterPath: createdMovie.posterPath
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: "Adding the movie failed!"
    });
  });
})

/**
 * Fetches every movie in the database
 */
router.get('', (req, res) => {
  Movie.find().then(movies => {
    res.status(200).json({
      message: 'Movies fetched successfully!',
      movies: movies
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching movies failed!"
    });
  });
});

/**
 * Pulls a movie from the database
 */
router.get('/:id', (req, res) => {
  Movie.findById(req.params.id).then(movie => {
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({message: 'Movie not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching movie failed!"
    });
  })
})

/**
 * Updates a movies contents after they have been manually changed
 */
router.put('/:id', checkAuth, multer({storage: storage}).single('poster'), (req, res) => {
  let posterPath = req.body.posterPath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    posterPath = url + '/images/' + req.file.filename;
  }
  const movie = new Movie({
    _id: req.body.id,
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
    posterPath: posterPath
  });
  Movie.updateOne({_id: req.params.id}, movie).then(result => {
    if (result.n > 0) {
      res.status(200).json({message: 'Successfully updated!'});
    } else {
      res.status(401).json({message: ' Only the uploader of new movie is allowed to update it!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't update the movie!"
    });
  })
});

/**
 * Deletes a movie
 */
router.delete('/:id', checkAuth, (req, res) => {
  Movie.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Movie deleted.'});
  }).catch(error => {
    res.status(500).json({
      message: "Deleting the movie failed!"
    });
  })
});

/**
 * @type {Router}
 */
module.exports = router;
