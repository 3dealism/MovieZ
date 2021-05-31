const mongoose = require('mongoose');

/**
 * @deprecated
 * @class commentSchema
 * @param {number} rating
 * @param {string} title is required
 */
const commentSchema = mongoose.Schema({
  rating: {type: Number},
  movieId: {type: String}
});

/**
 *
 * @type {Model<Document>}
 */
module.exports = mongoose.model('Comment', commentSchema);
