// load the things we need
var mongoose = require('mongoose');

var imageDoc = mongoose.Schema({
    url             : String,
    snippet         : String,
    thumbnail       : String,
    context         : String,
    created_at      : Date
});

// on every save, add the date
imageDoc.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('ImageDoc', imageDoc);