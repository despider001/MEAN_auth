const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

module.exports = passport => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.passport_secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        User.findById(jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                let returnedUser = {
                    ...user._doc,
                    password: null
                }
                return done(null, returnedUser);
            } else {
                return done(null, false);
            }
        });
    }));
}
