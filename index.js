const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Todo = require('./models/todo');

const todoRoutes = require('./routes/todos');

//connect to database
mongoose.connect('mongodb+srv://test:test1@cluster0-lqhsl.mongodb.net/', {
    dbName: 'test',
    useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get("/", function (req, res) {
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);

console.log("HELLO FROM ROOT INDEX")

app.listen(8080, function () {
    console.log("todo list is running");
})