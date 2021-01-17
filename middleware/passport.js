const jwtStategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const jwtToken = require('../config/token');
const User = require('../models/User');

const option = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtToken.jwt
};

module.exports = (passport) => {
    passport.use(
        new jwtStategy(option, async (payload, done) => {

            try {
                const user = await User.findById(payload.userId).select('email id');

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
                
            } catch (error) {
                console.error(error);
            }
            
        })
    )
};