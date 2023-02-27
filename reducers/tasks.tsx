import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { translateApi } from '../services/translate';

export type Task = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type InitialState = {
    status: 'loading' | 'complete';
    error: string;
    entities: Task[];
};

const initialState: InitialState = {
    status: 'complete',
    error: '',
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
    name: 'tasks',
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

export const fetchTranslation = createAsyncThunk(
    'fetchTranslation',
    async (q, { dispatch, getState }) => {
        const { settings: { sourceLang, targetLang } } = getState();
        const translation = await translateApi({ q, sourceLang, targetLang })
        //console.log('translation', translation)
        if (translation) {
            const { taskAdded } = tasksSlice.actions;
            dispatch(taskAdded({ id: Date.now(), origin: q, translation, isCompleted: false }));
        }
    }
);

const tasksSlice2 = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTranslation.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchTranslation.fulfilled]: (state, { error, payload }) => {
            state.status = 'complete'
            if(error) {
                state.error = error
            }
        },
    }
})


export const { taskAdded, taskToggled, taskRemove } = tasksSlice.actions;

export default tasksSlice.reducer;
