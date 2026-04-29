export default function PokemonCardsGrid({
    displayedPokemon,
    favorites,
    toggleFavorite,
    fetchPokemonDetails,
  }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayedPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
           className="relative rounded-[30px] p-5 min-h-[200px] bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Pokemon ID */}
            <div className="text-sm text-white/60 font-medium">
              #{String(pokemon.id).padStart(4, "0")}
            </div>
  
            {/* Favorite Heart */}
            <div
              onClick={() => toggleFavorite(pokemon.id)}
              className={`absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border border-white/20 text-2xl ${
                favorites.includes(pokemon.id)
                  ? "text-[#D4A569]"
                  : "text-white/70"
              }`}
            >
              {favorites.includes(pokemon.id) ? "♥" : "♡"}
            </div>
  
            {/* Pokemon Image */}
            <div className="flex justify-center mt-4">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-40 h-40 object-contain hover:scale-110 transition duration-300"
              />
            </div>
  
            {/* Bottom Content */}
            <div className="mt-4">
              {/* Pokemon Name */}
              <h2 className="text-xl font-bold capitalize text-left">
                {pokemon.name}
              </h2>
  
              {/* Pokemon Type */}
              <div className="mt-4 flex items-center gap-2 justify-between">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-thin uppercase tracking-wide bg-[#523828] text-[#D4A569] border border-[#D4A569]/20">
                  {pokemon.type}
                </span> 
                 <button
                onClick={() => fetchPokemonDetails(pokemon.name)}
                className="inline-block px-3 py-1 rounded-full text-sm font-bold tracking-wide bg-[#523828] text-[#D4A569] border border-[#D4A569]/20"
              >
              i
              </button>
              </div>
  
            </div>
          </div>
        ))}
      </div>
    );
  }