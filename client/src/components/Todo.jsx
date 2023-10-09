import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, deleteTodo }) => {
  return (
    <div className="bg-gray-200 m-3 p-3 border rounded-md w-full md:w-1/2 lg:w-1/3 flex justify-between items-center">
      <div className="text-lg">{task.name}</div>

      <FontAwesomeIcon
        className="text-red-700 cursor-pointer"
        icon={faTrash}
        onClick={() => deleteTodo(task.id)}
      />
    </div>
  );
};

export default Todo;
