const mongoose = require('mongoose');


/**
 * @class movieSchema
 * @param {string} title is required
 * @param {string} director is required
 * @param {string} genre is required
 * @param {string} year
 * @param {string} posterPath is required contents are path to movieposter
 * @param {string} creator The Schema of the uploader
 */
const movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  director: {type: String, required: true},
  genre: {type: String, required: true},
  year: {type: String},
  posterPath: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // testing to see if necessary
},
  {
    versionKey: false // You should be aware of the outcome after set to false
  });


/**
 *
 * @type {Model<Document>}
 */
module.exports = mongoose.model('Movie', movieSchema);
