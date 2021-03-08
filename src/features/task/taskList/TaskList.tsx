import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getInfo, selectTasks } from "../taskSlice";
import TaskItem from "../taskItem/TaskItem";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
