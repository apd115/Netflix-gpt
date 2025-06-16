

export const VideoTitle = ({ title, overview }) => {
    return (
        <div className="pt-[20%] w-screen h-screen px-24 absolute text-white bg-gradient-to-r from-black">
            <h1 className=" font-bold text-4xl">{title}</h1>
            <p className="py-6 text-sm w-1/4">{overview}</p>
            <div>
                <button className="bg-white text-black p-4 px-16 text-xl hover:bg-opacity-90 rounded-lg">▶️ Play</button>
                <button className="bg-gray-500 text-white mx-2 p-4 px-16 text-xl bg-opacity-50 rounded-lg">More Info</button>
            </div>
        </div>
    )
}

