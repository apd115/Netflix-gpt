import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import langReducer from "./langConfig";
import authReducer from "./authSlice";
export const appStore = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        movies: movieReducer,
        gpt: gptReducer,
        langConfig: langReducer,

    },
});
