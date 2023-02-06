import { combineReducers } from '@reduxjs/toolkit';
import todos from "./tasks";
import settings from "./settings";


export default combineReducers({
    todos,
    settings,
})
