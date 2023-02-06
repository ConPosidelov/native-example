import { createSlice } from '@reduxjs/toolkit';

export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type InitialState = {
    status: 'idle' | 'loading' | 'complete';
    entities: Task[];
};

const initialState: InitialState = {
    status: 'idle',
    entities: [
        {
            id: '1',
            origin: 'Код',
            translation: 'Code',
            isCompleted: true,
        },

    ],
};

const tasksSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        taskAdded(state, action) {
            const todo = action.payload;
            state.entities.push(todo);
        },
        taskToggled(state, action) {
            const todoId = action.payload;
            const todo = state.entities.find(e => e.id === todoId);
            if(todo) {
                todo.isCompleted = !todo.isCompleted;
            }
        },
        taskRemove(state, action) {
            const todoId = action.payload;
            state.entities = state.entities.filter(e => e.id !== todoId)
        },
    },
});

export const { taskAdded, taskToggled, taskRemove } =
    tasksSlice.actions;

export default tasksSlice.reducer;
