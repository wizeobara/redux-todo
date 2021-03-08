import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

interface TaskState {
  isLoading: boolean;
  //storeに保存するタスク
  tasks: { _id: string; title: string; completed: boolean }[];
  //編集の際にどのタスクを編集するか
  selectedTask: { _id: string; title: string; completed: boolean };
  isModalOpen: boolean;
}

const API_URL_PROGRESS = "http://localhost:5000/progress/";

const _getInfo = async () =>
  axios.get(API_URL_PROGRESS).then((v) => {
    return { data: v.data };
  });

const _addInfo = async (args: { title: string; completed: boolean }) =>
  axios.post(API_URL_PROGRESS, args);

const _completeInfo = async (args: { _id: string; completed: boolean }) =>
  axios.post(API_URL_PROGRESS + "complete/" + args._id, {
    completed: args.completed,
  });

const _deleteInfo = async (args: { _id: string }) =>
  axios.delete(API_URL_PROGRESS + args._id);

const _editInfo = async (args: { _id: string; title: string }) =>
  axios.post(API_URL_PROGRESS + "update/" + args._id, {
    title: args.title,
  });

export const getInfo = createAsyncThunk("get/getInfo", _getInfo);

export const addInfo = createAsyncThunk(
  "post/addInfo",
  async (args: { title: string; completed: boolean }, { dispatch }) => {
    await _addInfo(args);
    dispatch(getInfo());
  }
);

export const completeInfo = createAsyncThunk(
  "post/completeInfo",
  async (args: { _id: string; completed: boolean }, { dispatch }) => {
    await _completeInfo(args);
    dispatch(getInfo());
  }
);

export const deleteInfo = createAsyncThunk(
  "delete/deleteInfo",
  async (args: { _id: string }, { dispatch }) => {
    await _deleteInfo(args);
    dispatch(getInfo());
  }
);

export const editInfo = createAsyncThunk(
  "post/editInfo",
  async (args: { _id: string; title: string }, { dispatch }) => {
    await _editInfo(args);
    dispatch(getInfo());
  }
);

const initialState: TaskState = {
  isLoading: false,
  tasks: [],
  selectedTask: { _id: "", title: "", completed: false },
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //task選択管理
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    //Modal open&close management
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInfo.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
    });
  },
});

export const { selectTask, handleModalOpen } = taskSlice.actions;

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
