import { configureStore } from "@reduxjs/toolkit";

import bookmarkReducer from '../features/bookmarkSlice'

const store = configureStore({
    reducer: bookmarkReducer
});

export default store;