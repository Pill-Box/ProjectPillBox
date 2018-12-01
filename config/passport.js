const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  // User = require('../'),
  db = require('../models'),
  JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt,
  jwtSecret = require('./jwtConfig'),
  bcrypt = require('bcryptjs');
  const util = require('util')

  const BCRYPT_SALT_ROUNDS = 12;

  // Passport User Registration Section 
  passport.use(
    'register',
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false
      },
      (username, password, done) => {
        try {
          db.User.findOne({
            where: {
              user_name: username
            }
          }).then(user => {
            if(user !== null) {
              console.log('username already taken');
              return done(null, false, {message: 'Username already taken'});
            } else {
              bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                  db.User.create({
                      user_name: username,
                      hashed_password: hashedPassword
                    }).then(user => {
                    console.log('User created');
                    return done(null, user);
                  });
                });
            }
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );

// Passport Login Section
passport.use(
  'login',
  new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false
      },
      (username, password, done) => {
        try {
          db.User.findOne({
            where: {
              user_name: username
            }
          }).then(user => {
            // console.log('user on passport.js ' + util.inspect(user.dataValues));
            if(user === null) {
              return done(null, false, {message: 'Login failed'});
            } else {
              bcrypt.compare(password, user.hashed_password).then(response => {
                if (response !== true) {
                  // console.log('passwords do not match');
                  return done(null, false, {message: 'Login failed'});
                }
                console.log('user found & authenticated');
                // console.log('user on passport.js ' + util.inspect(user.dataValues));
                return done(null, user);
              });
            }
          });
        } catch (err) {
          done (err);
        }
      },
    ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret
};

// Passport JWT Section
passport.use(
  'jwt', new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      db.User.findOne({
        where: {
          user_name: jwt_payload.id
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport')
          done(null, user);
        } else {
          console.log('user not found in db')
          done(null, false);
        }
      });
    } catch (err) {
      done(err)
    }
  }),
);

  