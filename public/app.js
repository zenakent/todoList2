$(document).ready(function () {
    $.getJSON('/api/todos')
        .then(addTodos);

    $("#todoInput").keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'span', function (e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function () {
        console.log('this is updateTODO app.js')
        updateTodo($(this));
    })
})

//function to add all the todos to the page
function addTodos(todos) {
    console.log(todos)
    todos.forEach(function (todo) {
        addTodo(todo);
    })
}

//function to add one single todo to the page
function addTodo(todo) {
    const newTodo = $(`<li class="task">${todo.name}<span>X</span></li>`);
    newTodo.data('id', todo._id); //gets the id of the single todo
    newTodo.data('completed', todo.completed); //gets the completed of the single todo

    if (todo.completed) {
        newTodo.addClass("done")
    }

    $('.list').append(newTodo);
}

//create a todo
function createTodo() {
    const userInput = $('#todoInput').val();
    $.post('api/todos', {
        name: userInput
    }, function (newTodo) {
        $('#todoInput').val("");
        addTodo(newTodo);
    })
}

//remove todo *this one doesn't update the list somehow*
// function removeTodo(todo) {
//     const clickedId = todo.data('id');
//     const deleteUrl = `/api/todos/${clickedId}`;
//     $.ajax({
//         method: 'DELETE',
//         url: deleteUrl
//     }, function (data) {
//         todo.remove();
//     })
// }
function removeTodo(todo) {
    const clickedId = todo.data('id');
    const deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then((data) => {
            todo.remove();
        })
        .catch((err) => {
            console.log(err);
        });
};
//update todo
// function updateTodo(todo) {
//     const updateUrl = '/api/todos/' + todo.data('id');
//     const isDone = !todo.data('completed');
//     const updateData = {
//         completed: isDone
//     };

//     $.ajax({
//         method: 'PUT',
//         url: updateUrl,
//         data: updateData,
//     }, function (updatedTodo) {
//         todo.toggleClass('done');
//         todo.data('completed', isDone);
//     })
// }

const updateTodo = (todo) => {
    var updateUrl = '/api/todos/' + todo.data('id') + '/update';
    console.log(updateUrl)
    var isDone = !todo.data('completed');
    var updateData = {
        completed: isDone
    };
    $.ajax({
            method: 'GET',
            url: updateUrl,
            data: updateData
        })
        .then((updatedTodo) => {
            todo.toggleClass("done");
            todo.data('completed', isDone);
        });
};