

export const VideoTitle = ({ title, overview }) => {
    return (
        <div className="md:pt-[20%] pt-[35%] w-screen h-screen px-4 md:px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className=" font-bold text-2xl md:text-4xl">{title}</h1>
            <p className="hidden md:inline-block py-6 text-sm w-1/4">{overview}</p>
            <div className="my-2 md:my-0">
                <button className="bg-white text-black px-2 md:px-16 py-2 text-md md:text-xl hover:bg-opacity-90 rounded-lg">▶️ Play</button>
                <button className="bg-gray-500 text-white mx-2 py-2 px-2 md:px-16 text-md md:text-xl bg-opacity-50 rounded-lg">More Info</button>
            </div>
        </div>
    )
}

