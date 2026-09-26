const express = require("express");
const router = express.Router();
const passport = require("passport");

// GitHub login
router.get("/github", (req, res, next) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Login with GitHub'
  next();
}, passport.authenticate("github", {
  scope: ["user:email"]
}));

// GitHub OAuth callback
router.get("/github/callback", (req, res, next) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'GitHub OAuth callback'
  next();
}, passport.authenticate("github", {
  failureRedirect: "/auth/login-failed"
}), (req, res) => {
  res.redirect("/auth/profile");
});

// View logged-in user
router.get("/profile", (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'View logged-in user'
  // #swagger.security = [{ "GitHubOAuth": [] }]

  if (!req.user) {
    return res.status(401).json({
      message: "Not logged in."
    });
  }

  res.status(200).json(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Logout'
  // #swagger.security = [{ "GitHubOAuth": [] }]

  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Logout failed."
      });
    }

    res.json({
      message: "Logged out successfully."
    });
  });
});

// Login failure
router.get("/login-failed", (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Login failure'

  res.status(401).json({
    message: "GitHub login failed."
  });
});

module.exports = router;