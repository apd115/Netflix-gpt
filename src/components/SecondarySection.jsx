import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";


export const SecondarySection = () => {

    const movies = useSelector((store) => store.movies);
    console.log(movies);
    return (
        movies.nowPlayingMovies && (
            < div className="bg-black" >
                <div className="-mt-52 relative z-20 pl-12">
                    <MovieList title="Now Playing Movies" movies={movies.nowPlayingMovies} />
                    <MovieList title="Trending" movies={movies.nowPlayingMovies} />
                    <MovieList title="Popular" movies={movies.nowPlayingMovies} />
                    <MovieList title="Horror" movies={movies.nowPlayingMovies} />
                </div>
            </div >
        )

    );
};


