import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

// Create a Sequelize instance and connect to the MySQL database
const sequelize = new Sequelize("todo", "jishnu", "password", {
  host: "localhost",
  dialect: "mysql"
});

// Define a model for your "todo_db" table
const Todo = sequelize.define("Todo", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchronize the model with the database (create the table if it doesn't exist)
sequelize
  .sync()
  .then(() => {
    console.log("Connected to MySQL database and synchronized models!");
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error);
  });

app.use(cors());
app.use(express.json());

// Route to fetch all tasks from the database
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching tasks from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new task to the database
app.post("/api/todos", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = await Todo.create({ name: task });
    res.status(201).json({ message: "Task added successfully", todo: newTodo });
  } catch (error) {
    console.error("Error adding task to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a task by ID
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const todo = await Todo.findByPk(taskId);

    if (!todo) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    await todo.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Database working");
});

// Start the server
const startServer = async () => {
  try {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
