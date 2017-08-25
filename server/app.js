const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// add your code here

// Create array with initial data 
var ToDoItems = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

// status message from server with generic object {}
app.get('/', (req, res) => {
    
    res.send({status: 'ok'});
        
});

// read ALL ToDo Items from ToDoItems
app.get('/api/TodoItems', (req, res) => {
    
    res.send(ToDoItems);
        
});

// read SINGLE ToDo Items from ToDoItems
app.get('/api/TodoItems/:number', (req, res) => {

    // ToDoItems.forEach(function(ToDoItem) {

    //     if(ToDoItem.todoItemId === req.params.number){
    //         res.json(ToDoItem);
    //     }
    
    // });

    if (typeof parseInt(req.params.number) !== "number"){
        return res.status(400).send("Please enter a number");
    }

    var toDoItemObj = ToDoItems.find(function (item){
        return item.todoItemId === parseInt(req.params.number);
    })

    res.json(toDoItemObj);

        
});

// create a single ToDo item / add item to dataset
app.post('/api/TodoItems/', (req, res, next) => {
    ToDoItems.push(req.body);
    console.log(req.body);
    res.status(201).json(req.body);
});


app.delete('/api/TodoItems/:number', (req, res) => {
    
    ToDoItems.forEach(function(ToDoItem, index) {
        if(ToDoItem.todoItemId === parseInt(req.params.number)){
            console.log(ToDoItem);
            var removed = ToDoItems.splice(index, 1);
            console.log({removed});
            return res.json(removed[0]);
        };    
    });
    res.status(200).send('OK')
});



module.exports = app;
