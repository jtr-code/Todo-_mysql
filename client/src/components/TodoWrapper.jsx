import { useEffect, useState } from "react";
import axios from "axios";
// components
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import Login from "./Login";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => {
        return setTodos(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // add todo
  const addTodo = (todo) => {
    axios
      .post("http://localhost:5000/api/todos", { task: todo })
      .then((response) => {
        console.log(response.data.message);

        axios
          .get("http://localhost:5000/api/todos")
          .then((response) => {
            setTodos(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated todos: " + error.message);
          });

        // Clear the input field
        setValue("");
      })
      .catch((error) => {
        console.error("Error adding todo: " + error.message);
      });
  };

  // delete todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then((response) => {
        console.log(response.data.message);

        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo: " + error.message);
      });
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center flex-col relative">
      <Login />
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) => (
        <Todo key={todo.id} task={todo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoWrapper;
