let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb+srv://test:test1@cluster0-lqhsl.mongodb.net/', {
    dbName: 'test',
    useNewUrlParser: true
});

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");