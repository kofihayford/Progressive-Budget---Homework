const express = require("express");
require('dotenv').config();
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const PORT = 3000;

const app = express();

// uncomment before production
// app.get('*', function (req, res) {
//   res.redirect('https://' + req.headers.host + req.url);

//   // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//   // res.redirect('https://example.com' + req.url);
// })

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