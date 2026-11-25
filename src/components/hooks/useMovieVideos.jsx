import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideos } from "../../utils/movieSlice";
import { apiFetch } from "../../utils/api";
import { useSelector } from "react-redux";


export const useMovieVideos = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideos = useSelector((store) => store.movies.trailerVideos);


    const movieVideos = async () => {

        const json = await apiFetch("/movies/" + movieId + "/videos");

        const filterTrailers = json.results.filter(video => video.type === "Trailer");
        const trailer = (filterTrailers.length) ? filterTrailers[0] : json.results[0];
        dispatch(addTrailerVideos(trailer));

    };
    useEffect(() => {
        !trailerVideos && movieVideos();
    }, []);
}
