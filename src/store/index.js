import { configureStore } from "@reduxjs/toolkit";

import jobReducer from "./job";
import authReducer from "./auth";

const store = configureStore({
reducer: { job: jobReducer, auth: authReducer},
});

export default store;
