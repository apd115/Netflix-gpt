import { useDispatch, useSelector } from "react-redux";
import { apiFetch } from "../../utils/api";
import { useEffect } from "react";
import { addTopRatedMovies } from "../../utils/movieSlice";



export const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

    const getTopratedMovies = async () => {
        const json = await apiFetch("/movies/top_rated");
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect(() => {
        !topRatedMovies && getTopratedMovies();
    }, []);

}

