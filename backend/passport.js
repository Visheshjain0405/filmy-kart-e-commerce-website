// const session = require("express-session");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const passportUtil = app => {
//     app.use(
//         session({
//             secret: "abc123def456",
//             resave: false,
//             saveUninitialized: false,
//             cookie: {
//                 maxAge: 1000 * 60 * 60 * 24
//             }
//         })
//     );
//     app.use(passport.initialize());
//     app.use(passport.session());

//     passport.use(
//         new GoogleStrategy({
//             clientID: "40785045790-0sit5dgvdc4jpi386bajvajj50q6hnod.apps.googleusercontent.com",
//             clientSecret: "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",
//             callbackURL: "/auth/google/callback",
//             scope: ["profile", "email"]
//         }, (accessToken, refreshToken, profile, callback) => {
//             callback(null, profile)
//         })
//     );

//     passport.serializeUser((user, done) => {
//         done(null, user);
//     });

//     passport.deserializeUser((user, done) => {
//         done(null, user);
//     });
// };

// module.exports = passportUtil;
