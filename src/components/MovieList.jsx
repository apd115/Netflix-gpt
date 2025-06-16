import { MovieCard } from "./MovieCard";

export const MovieList = ({ title, movies }) => {
    console.log(movies);

    return (
        <div>
            <div>
                <h1>{title}</h1>
                <div>
                    {/* {movies.map((movie) => )}; */}
                    < MovieCard posterPath={movies.poster_path} />

                </div>
            </div>

        </div>
    );
}


