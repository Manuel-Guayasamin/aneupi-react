require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    // dialectModule: require("pg"),
  },
  test: {
    url: process.env.DATABASE_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    // dialectModule: require("pg"),
  },
  production: {
    use_env_variable: "DATABASE_URL", // Use the DATABASE_URL directly
    dialect: "postgres",
    // dialectModule: require("pg"),
  },
};
