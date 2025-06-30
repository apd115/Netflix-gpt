import { VideoBackground } from "./VideoBackground";
import { VideoTitle } from "./VideoTitle";
import { useSelector } from "react-redux";

export const MainSection = () => {
    const movies = useSelector((state) => state.movies?.nowPlayingMovies);

    if (!movies) return; //knowns as early return
    const mainMovie = movies[1];



    const { title, overview, id } = mainMovie;
    return (
        <div className="md:pt-0 pt-[30%] bg-black">
            <VideoTitle title={title} overview={overview} />
            <VideoBackground movieId={id} />

        </div>
    );
};

