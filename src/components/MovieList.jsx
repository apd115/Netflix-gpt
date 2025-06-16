import { MovieCard } from "./MovieCard";


export const MovieList = ({ title, movies }) => {
    console.log(movies);
    if (!movies || movies.length === 0) return null;


    return (
        <div>
            <div className="px-6 ">
                <h1 className="text-2xl py-4 font-bold text-white ">{title}</h1>
                <div className="flex overflow-x-scroll">
                    <div className="flex ">
                        {movies?.map((movie) => (<MovieCard key={movie.id} posterPath={movie.poster_path} />))}

                    </div>
                </div>

            </div>

        </div>
    );
}


