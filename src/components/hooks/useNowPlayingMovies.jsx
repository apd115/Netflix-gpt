import { useEffect } from "react";
import { addNowPlayingMovies } from "../../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiFetch } from "../../utils/api";

export const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);



    const movies = async () => {
        const json = await apiFetch("/movies/now_playing");

        dispatch(addNowPlayingMovies(json.results));

    }

    useEffect(() => {
        !nowPlayingMovies && movies();
    }, []);



}


