const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const moviesRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');

mongoose.connect('mongodb+srv://uemit:amcikkerim6@cluster0.clt0z.mongodb.net/MovieDb?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to the MovieDb');
  }).catch(() => {
  console.log('Connection failed!');
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
 * @param {any} app
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use('/api/movies', moviesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;


