export default function NoAnimeFound({name, searchbar, fill}) {
    return <div className="w-full h-full text-center">
        <h1 className="text-5xl font-bold text-orange-500">No anime with the name "{name}" was found!</h1>
        <p className="text-xl text-medium text-white mt-8">Try another anime's name or click the button below to go back.</p>
        <div className="mt-12 text-center">
            <button 
            className="px-7 py-4 decoration-transparent bg-orange-600 text-white text-xl rounded-xl shadow"
            onClick={() => {
                fill()
                searchbar.current.value = ''
            }}
            >Show previous animes</button>
        </div>
    </div>
}