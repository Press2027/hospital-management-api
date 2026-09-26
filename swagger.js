const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Hospital Management API",
    description: "CSE 341 Project 2 API",
    version: "1.0.0"
  },

  host: "hospital-management-api-jp2e.onrender.com",

  schemes: ["https"],

  securityDefinitions: {
    GitHubOAuth: {
      type: "oauth2",
      authorizationUrl: "https://github.com/login/oauth/authorize",
      flow: "implicit",
      scopes: {
        "user:email": "Access user email"
      }
    }
  }
};

const outputFile = "./swagger.json";

const endpointsFiles = [
  "./routes/index.js",
  "./routes/auth.js",
  "./routes/patients.js",
  "./routes/appointments.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});