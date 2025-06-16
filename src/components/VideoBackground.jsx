
import { useSelector } from "react-redux";
import { useMovieVideos } from "./hooks/useMovieVideos";



export const VideoBackground = ({ movieId }) => {

    const trailerKey = useSelector((store) => store.movies?.trailerVideos?.key);
    useMovieVideos(movieId);


    return (
        <div className="w-screen">
            <iframe
                className="w-screen h-screen"
                width="560"
                height="315"
                src={"https://www.youtube.com/embed/" + trailerKey + "?&autoplay=1&mute=1"}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen></iframe>
        </div >
    );
}

