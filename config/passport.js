const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      config = require('config'),
      User = require('../models/user'),
      TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {
    // define options object
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    // serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // deserialize user
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // local strategy
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._doc._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    // twitter strategy
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "https://andydlindsay-baseauth.herokuapp.com/api/users/auth/twitter/callback"
    }, (token, tokenSecret, profile, cb) => {
        User.findOne({ 'twitter.id': profile.id }, (err, user) => {
            if (err) {
                return cb(err);
            }
            if (!user) {
                // user was not found
                const newUser = new User({
                    name: profile.displayName,
                    username: profile.username,
                    twitter: {
                        id: profile.id,
                        token: token,
                        displayName: profile.displayName,
                        username: profile.username,
                        image: profile.photos[0].value
                    }
                });
                newUser.save((err) => {
                    if (err) throw err;
                    return cb(err, newUser);
                });

            } else {
                // user was found
                return cb(err, user);
            }
        });
    }));

};