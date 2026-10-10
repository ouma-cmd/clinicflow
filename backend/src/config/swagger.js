const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "ClinicFlow API",

      version: "1.0.0",

      description: "Clinic management system API",
    },

    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./src/modules/**/*.routes.js"],
};

module.exports = swaggerJsdoc(options);
