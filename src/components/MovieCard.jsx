import { MOVIE_IMG_CDN } from "../utils/constants";

export const MovieCard = ({ posterPath }) => {
    return (
        <div className="flex w-48">
            <img alt="Movie Poster" src={MOVIE_IMG_CDN + posterPath} />
        </div>
    );
}
