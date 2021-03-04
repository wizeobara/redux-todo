import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

interface TaskState {
  //task何個あるか
  idCount: number;
  //storeに保存するタスク
  tasks: { id: number; title: string; completed: boolean }[];
  //編集の際にどのタスクを編集するか
  selectedTask: { id: number; title: string; completed: boolean };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{ id: 1, title: "Task A", completed: false }],
  selectedTask: { id: 0, title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //Add task機能
    createTask: (state, action) => {
      state.idCount++;
      const newTask = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    //タスク編集
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      //Change title of task that we matched
      if (task) {
        task.title = action.payload.title;
      }
    },
    //task選択管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //Modal open&close management
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { createTask, selectTask, handleModalOpen, editTask } = taskSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.task.tasks;
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.task.isModalOpen;
export const selectSelectedTask = (
  state: RootState
): TaskState["selectedTask"] => state.task.selectedTask;

export default taskSlice.reducer;
