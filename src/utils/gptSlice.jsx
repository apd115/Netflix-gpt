import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        movieMatches: [],
        movieNames: [],
        errorMsg: null,

    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;

        },
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

export const { toggleGptSearchView, addGeminiMovieResults, addGeminiErrorMsg } = gptSlice.actions;
export default gptSlice.reducer;
