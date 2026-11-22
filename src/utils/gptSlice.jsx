import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        movieMatches: [],
        movieNames: [],
        errorMsg: null,

    },
    reducers: {
        addGeminiMovieResults: (state, action) => {
            const { movieMatches, movieNames } = action.payload;
            state.movieMatches = movieMatches;
            state.movieNames = movieNames;

        },
        addGeminiErrorMsg: (state, action) => {
            state.errorMsg = action.payload;
        }
    },

});

export const { addGeminiMovieResults, addGeminiErrorMsg } = gptSlice.actions;
export default gptSlice.reducer;
