import { useEffect } from "react";
import { addNowPlayingMovies } from "../../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../../utils/constants";

export const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);



    const movies = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?lpage=1", options);

        const json = await data.json();

        dispatch(addNowPlayingMovies(json.results));

    }

    useEffect(() => {
        !nowPlayingMovies && movies();
    }, []);



}


