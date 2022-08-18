const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./database");
const cors = require("cors");
const TodoModel = require("./models/todo");
const app = express();

app.use(cors());
app.use(express.json());

//connect to database
connectDB();

//addTodos
app.post("/addTodo", async (req, res) => {
  const name = req.body.name;
  const todo = new TodoModel({
    name: name,
    completed: false,
    createdAt: Date.now(),
    completedAt: "",
  });
  await todo.save();
  res.send(todo);
});

//complete todos
app.put("/completed/:id", (req, res) => {
  const id = req.params.id;
  try {
    TodoModel.findById(id, async (error, todoCompleted) => {
      if (error) {
        console.log(error);
      } else {
        todoCompleted.completed = true;
        todoCompleted.completedAt = Date.now();
        todoCompleted.save();
      }
    });
  } catch (err) {
    console.log(err);
  }
  res.send("Marked as Completed");
});

//update a todo
app.put("/update", (req, res) => {
  const newTodo = req.body.newTodo;
  const id = req.body.id;
  try {
    TodoModel.findById(id, async (error, todoToUpdate) => {
      if (error) {
        console.log(error);
      } else {
        todoToUpdate.name = newTodo;
        todoToUpdate.save();
      }
    });
  } catch (err) {
    console.log(err);
  }
  res.send("Task Updated");
});

//read todos
app.get("/todolist", async (req, res) => {
  TodoModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//delete a todo
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TodoModel.findByIdAndRemove(id).exec();
  res.send("Task Deleted");
});

app.get("/", (req, res) => {
  res.send("ToDoApp api is up and running");
});

//listen to the port
app.listen(process.env.PORT || 3001, () => {
  console.log("You are connected");
});
