const express = require('express');
const router = express.Router();
// const db = require('../models')
const Todo = require('../models/todo');


// api todo
router.get('/', function (req, res) {
    Todo.find({}, function (err, foundTodos) {
        res.json(foundTodos);
    })
})


//show todo
router.get('/:todoId', function (req, res) {
    Todo.findById(req.params.todoId, function (err, foundTodo) {
        if (err) {
            console.log(err)
        } else {
            res.json(foundTodo);
        }
    })
})


//create todo
router.post('/', function (req, res) {

    console.log(req.body)
    Todo.create(req.body, function (err, newTodo) {
        if (err) {
            console.log(err);
        } else {
            res.json(newTodo)
        }
    })
})


//update todo
router.get('/:todoId/update', function (req, res) {
    Todo.findById(req.params.todoId, function (err, foundTodo) {
        if (foundTodo.completed == false) {
            foundTodo.completed == true
        }

        if (foundTodo.completed == true) {
            foundTodo.completed == false
        }

        res.json(foundTodo)
    })

    // Todo.findByIdAndUpdate({
    //     _id: req.params.todoId
    // }, req.body, function (err, foundTodo) {
    //     console.log(foundTodo)
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         res.json(foundTodo)
    //     }
    // })
})



//delete todo
router.delete('/:todoId', function (req, res) {
    Todo.findByIdAndDelete(req.params.todoId, function (err, foundTodo) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                message: 'deleted the todo'
            })
        }
    })
})



module.exports = router;