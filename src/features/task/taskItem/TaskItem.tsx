import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import EventNoteIcon from "@material-ui/icons/EventNote";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Modal from '@material-ui/core/Modal';
import TaskForm from '../taskForm/TaskForm'
import styles from "./TaskItem.module.scss";

interface PropTypes {
  task: { id: number; title: string; completed: boolean };
}
const TaskItem: React.FC<PropTypes> = ({ task }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          onClick={() => console.log(`check ${task.id}`)}
          className={styles.checkbox}
        />
        <button
          onClick={handleOpen}
          className={styles.edit_button}
        >
          <EditIcon className={styles.icon} />
        </button>
        <button
          onClick={() => console.log(`delete ${task.id}`)}
          className={styles.delete_button}
        >
          <DeleteForeverIcon className={styles.icon} />
        </button>
      </div>
      <Modal
        className={styles.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <div className={styles.modal_content}>
              <h3 className={styles.modal_title}>EDIT TASK</h3>
              <TaskForm edit/>
          </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
