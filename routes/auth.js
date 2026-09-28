const express = require("express");
const router = express.Router();
const passport = require("passport");

// GitHub login
router.get(
  "/github",
  (req, res, next) => {
    // #swagger.tags = ["Authentication"]
    // #swagger.summary = "Login with GitHub"
    next();
  },
  passport.authenticate("github", {
    scope: ["user:email"]
  })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  (req, res, next) => {
    // #swagger.tags = ["Authentication"]
    // #swagger.summary = "GitHub OAuth callback"
    next();
  },
  passport.authenticate("github", {
    failureRedirect: "/auth/login-failed"
  }),
  (req, res) => {
    // Login successful
    // Redirect user to the application's home page
    res.redirect("/");
  }
);

// View logged-in user
router.get("/profile", (req, res) => {
  // #swagger.tags = ["Authentication"]
  // #swagger.summary = "View logged-in user"

  if (!req.user) {
    return res.status(401).json({
      message: "Not logged in."
    });
  }

  res.status(200).json({
    _id: req.user._id,
    githubId: req.user.githubId,
    username: req.user.username,
    displayName: req.user.displayName,
    profileUrl: req.user.profileUrl
  });
});

// Logout
router.get("/logout", (req, res) => {
  // #swagger.tags = ["Authentication"]
  // #swagger.summary = "Logout"

  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        message: "Logout failed."
      });
    }

    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        return res.status(500).json({
          message: "Session destruction failed."
        });
      }

      res.json({
        message: "Logged out successfully."
      });
    });
  });
});

// Login failure
router.get("/login-failed", (req, res) => {
  // #swagger.tags = ["Authentication"]
  // #swagger.summary = "Login failure"

  res.status(401).json({
    message: "GitHub login failed."
  });
});

module.exports = router;