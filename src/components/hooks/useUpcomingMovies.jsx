import { useEffect } from "react";
import { apiFetch } from "../../utils/api";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../../utils/movieSlice";
import { useSelector } from "react-redux";


export const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

    const getUpcomingMovies = async () => {
        const json = await apiFetch("/movies/upcoming");
        dispatch(addUpcomingMovies(json.results));
    }
    useEffect(() => {
        !upcomingMovies && getUpcomingMovies();
    })
}

