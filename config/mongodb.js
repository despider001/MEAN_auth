const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host}/${process.env.mongo_database}?retryWrites=true`, { useNewUrlParser: true }).then(
  () => {
    console.log('Connected to database!');
  }
).catch(err => console.log(err)); 

module.exports = mongoose;  