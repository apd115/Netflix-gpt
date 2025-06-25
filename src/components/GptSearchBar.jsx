import { useSelector } from "react-redux";
import lang from "../utils/langConstants.jsx";


export const GptSearchBar = () => {

    const langKey = useSelector((store) => store.langConfig.lang);
    return (
        <div className="pt-[10%] flex justify-center">

            <form className="bg-black rounded-lg w-1/2 grid grid-cols-12 ">
                <input type="text"
                    placeholder={lang[langKey].placeholder}
                    className="m-4 p-4 col-span-9 text-gray-600 bg-white">
                </input>
                <button className="bg-red-800 text-white rounded-lg col-span-3 m-4 py-2 px-4">{lang[langKey].search}</button>
            </form>

        </div>
    );
};

