const passport = require("passport");

// Adding route handler
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"] // google internally has the list of all different scopes that we can ask from user's account
    })
  );

  // Adding another route handler to take the user request

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout(); // function that is attached automatically to the request object by passport
    res.send(req.user); // we get empty response
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    //res.send(req.session); // contains data that passport is trying to save inside of the cookie
  });
};
