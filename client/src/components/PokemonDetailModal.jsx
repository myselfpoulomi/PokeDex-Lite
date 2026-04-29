export default function PokemonDetailModal({
    selectedPokemon,
    setSelectedPokemon,
    favorites = [],
    toggleFavorite,
  }) {
    if (!selectedPokemon) return null;
  
    const isFavorite = favorites?.includes(selectedPokemon.id);
  
    const statData = [
      { label: "HP", value: selectedPokemon.hp || 0 },
      { label: "Attack", value: selectedPokemon.attack || 0 },
      { label: "Defense", value: selectedPokemon.defense || 0 },
      { label: "Sp. Atk", value: selectedPokemon.attack || 0 },
      { label: "Sp. Def", value: selectedPokemon.defense || 0 },
      { label: "Speed", value: selectedPokemon.speed || 0 },
    ];
  
    return (
      <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
        <div className="relative w-full max-w-3xl h-[82vh] rounded-[24px] border border-white/20 bg-white/5 backdrop-blur-xl shadow-2xl overflow-y-auto">
  
          {/* Close Button */}
          <button
            onClick={() => setSelectedPokemon(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full border border-white/10 bg-white/10 text-white text-base hover:scale-105 transition"
          >
            ✕
          </button>
  
          {/* Top Section */}
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-7">
  
            {/* Left Side Image */}
            <div className="flex items-center justify-center">
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                className="w-44 h-44 object-contain"
              />
            </div>
  
            {/* Right Side Info */}
            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-[3px] uppercase text-white/60 mb-2">
                #{String(selectedPokemon.id).padStart(4, "0")}
              </p>
  
              {/* Name + Favorite Heart */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-white">
                  {selectedPokemon.name}
                </h2>
  
                <button
                  onClick={() => toggleFavorite(selectedPokemon.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border border-white/20 text-2xl transition ${
                    isFavorite
                      ? "text-[#D4A569]"
                      : "text-white/70"
                  }`}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>
  
              {/* Type Pills */}
              <div className="flex gap-2 flex-wrap mb-5">
                <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase border border-white/10 bg-white/5 text-white">
                  {selectedPokemon.type}
                </span>
  
                {selectedPokemon?.abilities?.[1] && (
                  <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase border border-white/10 bg-white/5 text-white">
                    {selectedPokemon.abilities[1]}
                  </span>
                )}
              </div>
  
             
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="p-6 md:p-7 border-t border-white/10">
  
            {/* Height + Weight */}
            <div className="grid md:grid-cols-2 gap-5 mb-8">
  
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase text-white/60 mb-2 tracking-wide">
                  Height
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {selectedPokemon.height || 0} m
                </h3>
              </div>
  
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase text-white/60 mb-2 tracking-wide">
                  Weight
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {selectedPokemon.weight || 0} kg
                </h3>
              </div>
  
            </div>
  
            {/* Base Stats */}
            <h3 className="text-lg font-semibold uppercase tracking-[2px] text-white/80 mb-5">
              Base Stats
            </h3>
  
            <div className="space-y-3 mb-8">
              {statData.map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm text-white mb-1">
                    <span>{stat.label}</span>
                    <span>{stat.value}</span>
                  </div>
  
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#D4A569]"
                      style={{
                        width: `${Math.min(stat.value, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
  
            {/* Abilities */}
            <h3 className="text-lg font-semibold uppercase tracking-[2px] text-white/80 mb-4">
              Abilities
            </h3>
  
            <div className="flex flex-wrap gap-2">
              {selectedPokemon?.abilities?.length > 0 ? (
                selectedPokemon.abilities.map((ability, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white"
                  >
                    {ability}
                  </span>
                ))
              ) : (
                <p className="text-white/60 text-sm">
                  No abilities found
                </p>
              )}
            </div>
  
            {/* Moves */}
            <h3 className="text-lg font-semibold uppercase tracking-[2px] text-white/80 mt-8 mb-4">
              Moves
            </h3>
  
            <div className="flex flex-wrap gap-2">
              {selectedPokemon?.moves?.slice(0, 8)?.map((move, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full border border-white/10 bg-[#D4A569]/10 text-sm text-white"
                >
                  {move}
                </span>
              ))}
            </div>
  
          </div>
        </div>
      </div>
    );
  }