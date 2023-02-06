import { combineReducers } from '@reduxjs/toolkit';
import tasks from "./tasks";
import settings from "./settings";


export default combineReducers({
    tasks,
    settings,
})
