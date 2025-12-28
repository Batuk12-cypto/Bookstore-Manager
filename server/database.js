// const e = require('express');
const mongoose = require('mongoose');

const databaseConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bookstore');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
};

module.exports = databaseConnection;