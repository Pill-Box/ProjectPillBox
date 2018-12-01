const db = require('../models')
const passport = require("passport");
const jwtSecret = require('../config/jwtConfig')
const jwt = require('jsonwebtoken')
const util = require('util')

module.exports = app => {

// Register User
    app.post('/registerUser', (req, res, next) => {
        passport.authenticate('register', (err, user, info) => {
            if (err) {console.log(err);}

            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    const data = {
                        name_first: req.body.name_first,
                        name_last: req.body.name_last,
                        username: req.body.username
                    };
                    db.User.findOne({
                        where: {
                          user_name: data.username
                        }
                    }).then(user => {
                        console.log(data);
                          user.update(
                            {
                                name_first: data.name_first,
                                name_last: data.name_last
                            }
                            ).then(() => {
                                console.log('user create in db')
                                res.status(200).send({mesasge: 'user created'});
                            });
                    });// end findOne
                });//end login() and callback
            }//end if/else
        })(req, res, next);
    }); //end app.post and callback function

    // Login User
    app.post('/loginUser', (req, res, next) => {
      // console.log('req on auth.js ' + util.inspect(req.body));
      passport.authenticate('login', (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
          console.log(info.message);
          res.send(info.message);
        } else {
          req.logIn(user, err => {
            console.log('user on auth.js at findOne ' + util.inspect(user.dataValues));
            db.User.findOne({
              where: {
                user_name: user.user_name
              }
            }).then(user => {
              // console.log('user on auth.js at jwt token ' + util.inspect(user));
              const token = jwt.sign({ id: user.user_name }, jwtSecret.secret);
              res.status(200).send({
                auth: true,
                token: token,
                message: 'user found & logged in',
              });
            }); // end findOne
          }); //end login() and callback
        } // end if/else
      })(req, res, next); //end passport authenticate
    }); //end app.post

//Find user route
    app.get('/findUser', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
          if (err) {
            console.log(err);
          }
          if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
          } else {
            console.log('user found in db from findUsers');
            res.status(200).send({
              auth: true,
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              password: user.password,
              message: 'user found in db',
            });
          }
        })(req, res, next);
      });

//Update user route
      app.put('/updateUser', (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
          if (err) {
            console.log(err);
          }
          if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
          } else {
            User.findOne({
              where: {
                username: user.username,
              },
            }).then(user => {
              if (user != null) {
                console.log('user found in db');
                user
                  .update({
                    first_name: req.body.name_first,
                    last_name: req.body.name_last,
                    email: req.body.email,
                  })
                  .then(() => {
                    console.log('user updated');
                    res.status(200).send({ auth: true, message: 'user updated' });
                  });
              } else {
                console.log('no user exists in db to update');
                res.status(404).json('no user exists in db to update');
              }
            });
          }
        })(req, res, next);
      });


}; //end module exports