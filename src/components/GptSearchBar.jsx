import { useSelector } from "react-redux";
import lang from "../utils/langConstants.jsx";
import { useRef } from "react";
import { options } from "../utils/constants.js";
import { GEMINI_URL, GEMINI_API_KEY } from "../utils/constants.js";
import { useDispatch } from "react-redux";
import { addGeminiErrorMsg, addGeminiMovieResults } from "../utils/gptSlice.jsx";



export const GptSearchBar = () => {

    const searchText = useRef();
    const dispatch = useDispatch();


    const geminiTmdbMovies = async (movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", options);
        const json = await data.json();
        return json.results;

    }
    const handleSearchClick = async () => {
        const userInput = searchText.current.value;

        const prompt = "Act as a movie recommendation system. Based on the user's input:" + userInput + "suggest 5 movies in this format: Movie1, Movie2, Movie3, Movie4, Movie5.";

        const data = {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        };


        const finalURL = GEMINI_URL + GEMINI_API_KEY;

        try {
            const response = await fetch(finalURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();


            // Access the model's output:
            const GeminiMovies = result.candidates?.[0]?.content?.parts?.[0]?.text;
            console.log("Movie Suggestions:", GeminiMovies);
            dispatch(addGeminiErrorMsg(GeminiMovies));

            //converted GeminiMovies string to an array
            const movieSuggestionsArray = GeminiMovies.split(",");
            console.log("Movie Suggestions Array:", movieSuggestionsArray);

            //searching same movies in tmdb database but this function geminiTmdbMovies is async so we need to use Promise.all to wait for all promises to resolve

            const promiseArray = movieSuggestionsArray.map((movie) => geminiTmdbMovies(movie));
            const finalGeminiTmdbMovies = await Promise.all(promiseArray);
            console.log("Final TMDB Movies:", finalGeminiTmdbMovies);

            //dispatching the finalGeminiTmdbMovies to the store
            dispatch(addGeminiMovieResults({ movieMatches: finalGeminiTmdbMovies, movieNames: movieSuggestionsArray }));

        } catch (error) {
            console.error("Gemini API error:", error.message);
        }




    };








    const langKey = useSelector((store) => store.langConfig.lang);
    return (
        <div className="pt-[10%] flex justify-center">

            <form className="bg-black rounded-lg w-1/2 grid grid-cols-12 " onSubmit={(e) => e.preventDefault()}>
                <input type="text"
                    ref={searchText}
                    placeholder={lang[langKey].placeholder}
                    className="m-4 p-4 col-span-9 text-gray-600 bg-white">
                </input>
                <button className="bg-red-800 text-white rounded-lg col-span-3 m-4 py-2 px-4" onClick={handleSearchClick}>{lang[langKey].search}</button>
            </form>

        </div>
    );
};

