import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value === "") return;

    addTodo(value);

    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 flex justify-between items-center p-3 border rounded-md w-full md:w-1/2 lg:w-1/3"
    >
      <input
        type="text"
        placeholder="Enter your Todo"
        className="placeholder-lime-700 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 h-10 border rounded-md px-2 m-6 "
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button
        type="submit"
        className="text-white bg-blue-800 dark:hover:bg-blue-700 w-1/3 py-2 rounded-md cursor-pointer"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
