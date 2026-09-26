const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const express = require("express");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

// Middleware
app.use(express.json())
;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {

    const users = mongodb.getDatabase().collection("users");

    let user = await users.findOne({
      githubId: profile.id
    });

    if (!user) {
      const newUser = {
        githubId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        profileUrl: profile.profileUrl
      };

      const response = await users.insertOne(newUser);

      user = {
        _id: response.insertedId,
        ...newUser
      };
    }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  const user = await mongodb
    .getDatabase()
    .collection("users")
    .findOne({
      _id: new (require("mongodb").ObjectId)(id)
    });

  done(null, user);
});

// API routes
app.use("/", routes);

// Swagger documentation
const swaggerDocument = require("./swagger.json");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// Start server after database connection
mongodb.initDB((err) => {
  if (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Database connected.`);
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
});