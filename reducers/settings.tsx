import { createSlice } from '@reduxjs/toolkit';


export type Langs = {
    value: string;
    label: string;
};

export type InitialState = {
    langs: Langs[];
    sourceLang: string;
    targetLang: string;
};

const initialState: InitialState = {
    sourceLang: 'ru',
    targetLang: 'en',
    langs: [
        {
            label: 'RU',
            value: 'ru'
        },
        {
            label: 'EN',
            value: 'en'
        },
        {
            label: 'PL',
            value: 'pl'
        },
    ],
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        sourceLangChange(state, action) {
            const lang = action.payload;
            state.sourceLang = lang;
        },
        targetLangChange(state, action) {
            const lang = action.payload;
            state.targetLang = lang;
        },
    },
});

export const { sourceLangChange, targetLangChange } = settingsSlice.actions;

export default settingsSlice.reducer;
