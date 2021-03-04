import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface TaskState {
    //task何個あるか
  idCount: number;
    //storeに保存するタスク
  tasks: {id: number; title: string; completed:boolean}[];
    //編集の際にどのタスクを編集するか
  selectedTask: { id: number; title: string; completed:boolean };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [{id:1, title: 'Task A', completed: false}],
  selectedTask:{id:0, title:'', completed: false},
  isModalOpen: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    //Add task機能
    createTask:(state, action) => {
        state.idCount++;
        const newTask = {
            id: state.idCount,
            title: action.payload,
            completed: false
        };
        state.tasks=[newTask, ...state.tasks]
    }
  },
});

export const { createTask } = taskSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTask = (state: RootState):TaskState['tasks'] => state.task.tasks;

export default taskSlice.reducer;
