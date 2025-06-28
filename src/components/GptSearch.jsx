import { BG_URL } from "../utils/constants";
import { GptMovieSuggestions } from "./GptMovieSuggestions";
import { GptSearchBar } from "./GptSearchBar";


export const GptSearch = () => {
    return (
        <div>
            <div className="fixed -z-40">
                <img
                    src={BG_URL}
                    alt="screen-img"
                />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />

        </div>
    );
}

