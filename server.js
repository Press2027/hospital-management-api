const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");
const { ObjectId } = require("mongodb");

const mongodb = require("./data/database");
const routes = require("./routes");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://hospital-management-api-jp2e.onrender.com/auth/github/callback"
          : "http://localhost:3000/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const users = mongodb.getDatabase().collection("users");

        let user = await users.findOne({ githubId: profile.id });

        if (!user) {
          const newUser = {
            githubId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl
          };

          const result = await users.insertOne(newUser);
          user = { _id: result.insertedId, ...newUser };
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Store user ID in session
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// Get user from MongoDB
passport.deserializeUser(async (id, done) => {
  try {
    const user = await mongodb
      .getDatabase()
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.use("/", routes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
mongodb.initDB((err) => {
  if (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
});