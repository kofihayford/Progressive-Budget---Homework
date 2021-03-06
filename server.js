const express = require("express");
require('dotenv').config();
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const PORT = 3000;

const app = express();

// uncomment before production
app.enable('trust proxy')
app.use(function (request, response, next) {

  if (process.env.NODE_ENV != 'development' && !request.secure) {
    return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
})
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(`mongodb+srv://kofihayford:${process.env.DATABASE_KEY}@cluster0.uohwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${PORT}!`);
});