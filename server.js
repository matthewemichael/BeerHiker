const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes");


const app = express();

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Bodyparser middleware
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );

// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB Config
const db = process.env.MONGODB_URI || require("./config/keys").mongoURI;

// Connect to MongoDB


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use(routes);

mongoose
  .connect(
    db
    // ,
    // { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



app.listen(port, () => console.log(`Server up and running on port ${port} !`));
