const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users"); // getting access to user model class / trying to fetch something out of model

passport.serializeUser((user, done) => {
  // to return a unique identification user id
  done(null, user.id); // user.id is not a google id instead it is id that is assigned to the record by mongo beacuse user can sign in with different domains like facebook etc..
});
passport.deserializeUser((id, done) => {
  // to take the unique identifier placed in that cookie and turn it back to actual user model
  User.findById(id).then(user => {
    done(null, user); //Always an asynchronous action
  });
});

passport.use(
  //// Authenticating users with google
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true  
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }) // to check whether a user already exists in database.

        .then(existingUser => {
          // using promise
          if (existingUser) {
            // if we already have a record with the given profile ID
            done(null, existingUser); // to tell the passport that process is completed i.e checking user is done
          } else {
            new User({ googleId: profile.id })
              .save() // creating a new instance of a user, "save" is used to store instance in db.
              .then(user => done(null, user)); // to indicate user is successfully saved
          }
        });
    }
  )
);
