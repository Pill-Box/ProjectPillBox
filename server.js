const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport")
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Define middleware here                     
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
 
  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/dashboard', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/addRx', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/addPatient', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/info', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/signout', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })

  app.get('/signup', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  })


}

// Requiring our models for syncing
var db = require("./models");

//	Import Passport Strategies & Config
require('./config/jwtConfig');
require('./config/passport');

app.use(passport.initialize())
app.use(passport.session())

// Add routes, both API and view
require('./routes/Rx')(app);
require('./routes/Patient')(app);
require('./routes/User')(app);
require('./routes/auth')(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log(`App listening on PORT ${PORT}`);
    });
});

