import { combineReducers, configureStore } from "@reduxjs/toolkit";

import bookmarkReducer from '../features/bookmarkSlice'
import planReducer from '../features/planSlice'

const rootReducer = combineReducers({
    bookmark: bookmarkReducer,
    plan: planReducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;