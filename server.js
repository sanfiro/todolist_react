const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const TODO_DB = path.join("./todo_db.json");

// const Y = path.join();

//PORTA DOVE IL SERVER E' IN ASCOLTO
app.set("port", process.env.PORT || 9999);

//LIBRERIA CHE PARSA IL BODY DI OGNI CHIAMATA E LO TRASFORMA IN JSON
app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  fs.readFile(TODO_DB, (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/todos", (req, res) => {
  fs.readFile(TODO_DB, (err, data) => {
    const todos = JSON.parse(data);

    const newTodo = {
      id: req.body.id,
      text: req.body.text,
    };
    todos.push(newTodo);
    fs.writeFile(TODO_DB, JSON.stringify(todos, null, 4), () => {
      res.json(todos);
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile(TODO_DB, (err, data) => {
    const todos = JSON.parse(data);
    const idDelete = parseInt(req.params.id);
    const removedArr = [...todos].filter((todo) => todo.id !== idDelete);
    fs.writeFile(TODO_DB, JSON.stringify(removedArr, null, 4), () => {
      res.json(removedArr);
    });
  });
});

app.put("/todos/:id", (req, res) => {
  fs.readFile(TODO_DB, (err, data) => {
    const todos = JSON.parse(data);
    const todoId=parseInt(req.params.id);
    const newValue={
      id:req.body.id,
      text:req.body.text
    }    
    var newTodos=todos.map((item) => (item.id === todoId ? newValue : item)
  );

    
   
    fs.writeFile(TODO_DB, JSON.stringify(newTodos, null, 4), () => {
      res.json(newTodos);
    });
  });
});

app.get("/todos/complete/:id", (req, res) => {
    fs.readFile(TODO_DB, (err, data) => {
      const todos = JSON.parse(data);
      const idDelete = parseInt(req.params.id);
      let updatedTodos = todos.map(todo => {
        if (todo.id === idDelete) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      });
      fs.writeFile(TODO_DB, JSON.stringify(updatedTodos, null, 4), () => {
        res.json(updatedTodos);
      });
    });
  });

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
