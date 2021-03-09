import React from "react";
import TaskForm from "../features/task/taskForm/TaskForm";
import TaskList from "../features/task/taskList/TaskList";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
      <Link to ="/sub">Sub Page</Link>
    </div>
  );
};

export default Main;
