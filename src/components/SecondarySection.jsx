import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";


export const SecondarySection = () => {

    const movies = useSelector((store) => store.movies);
    return (
        <div>
            {/* MovieList - NowPlaying
            MovieList - Horror
            MovieList - Tredning
            MovieCards*n */}
            <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} />
            console.log(movies.nowPlayingMovies)
        </div>
    );
};


