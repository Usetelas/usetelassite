const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev'
})

class AppControler {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppControler().express;