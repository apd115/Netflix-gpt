import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideos } from "../../utils/movieSlice";
import { options } from "../../utils/constants";
import { useSelector } from "react-redux";


export const useMovieVideos = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideos = useSelector((store) => store.movies.trailerVideos);


    const movieVideos = async () => {

        const response = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', options);


        const json = await response.json();

        const filterTrailers = json.results.filter(video => video.type === "Trailer");
        const trailer = (filterTrailers.length) ? filterTrailers[0] : json.results[0];
        dispatch(addTrailerVideos(trailer));

    };
    useEffect(() => {
        !trailerVideos && movieVideos();
    }, []);
}
