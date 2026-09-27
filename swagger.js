const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Hospital Management API",
    description: "CSE 341 Project 2 API",
    version: "1.0.0"
  },

  host: "hospital-management-api-jp2e.onrender.com",
  basePath: "/",
  schemes: ["https"]
};

const outputFile = "./swagger.json";

const endpointsFiles = [
  "./routes/index.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});