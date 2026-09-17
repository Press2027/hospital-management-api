const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Hospital Management API",
    description: "CSE 341 Project 2 API"
  },
  host: "hospital-management-api-jp2e.onrender.com",
  schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./server.js",
   "./routes/index.js",
  "./routes/patients.js",
  "./routes/appointments.js"

];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log("Swagger documentation generated successfully.");
  })
  .catch((error) => {
    console.error("Swagger generation failed:");
    console.error(error);
  });