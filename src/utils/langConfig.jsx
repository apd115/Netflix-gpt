import { createSlice } from "@reduxjs/toolkit";


const langConfig = createSlice({
    name: "langConfig",
    initialState: {
        lang: "English",
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.lang = action.payload;
        }
    },
});

export const { changeLanguage } = langConfig.actions;
export default langConfig.reducer;
