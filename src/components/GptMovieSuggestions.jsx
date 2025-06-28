import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";

export const GptMovieSuggestions = () => {

    const { movieNames, movieMatches } = useSelector((store) => store.gpt);

    if (!movieNames) return null;

    const isFallbackResponse =
        movieNames.length === 4 &&
        movieNames.every(line =>
            typeof line === "string" &&
            (line.includes("sorry") ||
                line.includes("no matching") ||
                line.toLowerCase().includes("couldn't find") ||
                line.length < 100) // you can customize this logic
        );

    return (
        <>

            {isFallbackResponse ? (
                <div className="bg-red-900 text-red-300 p-4 rounded-xl shadow-md space-y-2">
                    {movieNames.map((line, index) => (
                        <p key={index}>• {line}</p>
                    ))}
                </div>
            ) :
                <div className="p-4 m-4 bg-black/90 text-white ">
                    {
                        movieNames.map((movieName, index) => (
                            <MovieList key={movieName} title={movieName} movies={movieMatches[index]} />
                        )
                        )
                    }
                </div>
            }



        </>

    )
}

