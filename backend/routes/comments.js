const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');


/**
 * Posts Comments to a database
 */
router.post('/:movieId', (req, res) => {

  const comment = new Comment({
    username: req.body.username,
    content: req.body.content,
    movieId: req.body.movieId
  });
  comment.save().then(createdComment => {
    res.status(201).json({
      message: 'Comment added!',
      comment: {
        username: createdComment.username,
        content: createdComment.content,
        movieId: createdComment.movieId
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: "Adding the comment failed!"
    });
  });
})


/**
 * Fetches every comment in the database
 */
router.get('', (req, res) => {
  Comment.find().then(comments => {
    res.status(200).json({
      message: 'Comments fetched successfully!',
      comments: comments
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching comments failed!"
    });
  });
});

/**
 * Fetches every comment belonging to a movie
 */
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id).then(comment => {
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({message: 'Comment not found!'});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching comment failed!"
    });
  })
})


/**
 * Updates a comment to the database after the contents have been manually changed
 */
router.put('/:id', (req, res) => {

  const comment = new Comment({
    _id: req.body.userId,
    username: req.body.username,
    content: req.body.content,
    movieId: req.body.movieId
  });
  console.log(comment);
  Comment.updateOne({_id: req.params.userId}, comment).then(() => {
    res.status(200).json({message: 'Successfully updated!'});
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't udpate the comment!"
    });
  })
});

/**
 * Deletes a comment
 */
router.delete('/:id', (req, res) => {
  Comment.deleteOne({_id: req.params.userId}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Comment deleted.'});
  }).catch(error => {
    res.status(500).json({
      message: "Deleting the comment failed!"
    });
  })
});

/**
 *
 * @type {Router}
 */
module.exports = router;
