const mongoose = require('mongoose');

/**
 * @class commentSchema
 * @param {string} username is required
 * @param {string} content is required
 * @param {string} movieId
 */
const commentSchema = mongoose.Schema({
  username: {type: String, required: true},
  content: {type: String, required: true},
  movieId: {type: String},
},
  {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Comment', commentSchema);
