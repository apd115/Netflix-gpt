import { apiFetch } from "../../utils/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../../utils/movieSlice";

export const usePopularMovies = () => {

    const dispatch = useDispatch();
    const popularMovies = useSelector((store) => store.movies.popularMovies);
    const getPopularMovies = async () => {

        const json = await apiFetch("/movies/popular");

        dispatch(addPopularMovies(json.results));




    }

    useEffect(() => {
        !popularMovies && getPopularMovies();
    }, []);

}

