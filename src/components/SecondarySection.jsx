import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";


export const SecondarySection = () => {

    const movies = useSelector((store) => store.movies);

    return (
        < div className="bg-black" >
            <div className=" mt-0 md:-mt-52 relative z-20 pl-12">
                {movies.nowPlayingMovies && (


                    <MovieList title="Now Playing Movies" movies={movies.nowPlayingMovies} />
                )
                }
                {movies.popularMovies && (
                    <MovieList title="Popular Movies" movies={movies.popularMovies} />
                )}
                {movies.topRatedMovies && (
                    <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
                )}
                {movies.upcomingMovies && (
                    <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
                )

                }

            </div>
        </div >

    );
};


