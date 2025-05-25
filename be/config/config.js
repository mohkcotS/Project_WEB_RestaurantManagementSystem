require('dotenv').config(); // Load biến từ file .env

module.exports = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DB,
    host: process.env.DEV_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DEV_USERNAME, // hoặc tách riêng nếu cần
    password: process.env.DEV_PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DEV_USERNAME, // hoặc dùng biến PROD_*
    password: process.env.DEV_PASSWORD,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
