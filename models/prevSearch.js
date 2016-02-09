// load the things we need
var mongoose = require('mongoose');

var prevSearch = mongoose.Schema({
    term             : String,
    when             : String
});

// on every save, add the date
prevSearch.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.when)
    this.when = currentDate;

  next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model('PrevSearch', prevSearch);