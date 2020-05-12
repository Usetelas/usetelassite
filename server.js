const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config({
  path: "./.env.dev"
})

mongoose.connect(process.env.USETELAS_DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if(err) throw err;

  console.log('successfully connected to the database');
})

app.listen(process.env.USETELAS_PORT, () => {
  console.log('server successfuly connected');
})