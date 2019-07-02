const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession)
        .populate({
            path: 'restaurant',
            populate: { path: 'tables menu' }
        })
        .exec((err, userDocument) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, userDocument);
        })
});

passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username })

        .populate({
            path: 'restaurant',
            populate: { path: 'tables menu' }
        })

        .exec((err, foundUser) => {
            if (err) {
                next(err);
                return;
            }
            console.log(foundUser)
            if (!foundUser) {
                next(null, false, { message: 'Nombre de usuario incorrecto.' });
                return;
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                next(null, false, { message: 'Contraseña incorrecta.' });
                return;
            }

            next(null, foundUser);
        })
}));