import PokemonCardsGrid from "../customUI/PokemonCardsGrid";
import PokemonDetailModal from "../components/PokemonDetailModal";
import { useState } from "react";

export default function FavoritesPage({
  favorites,
  pokemonList,
  setShowFavorites,
  toggleFavorite,
  fetchPokemonDetails,
}) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);


  const favoritePokemon = pokemonList.filter((pokemon) =>
    favorites.includes(pokemon.id)
  );

  // const handleViewDetails = async (pokemonName) => {
  //   const details = await fetchPokemonDetails(pokemonName);
  //   if (details) {
  //     setSelectedPokemon(details);
  //   }
  // };

  return (
    <div className="flex-1 bg-[#1F1611] text-white px-4 md:px-8 py-8 min-h-0">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">
            My Favorites ♡
          </h1>

          <button
            onClick={() => setShowFavorites(false)}
            className="px-6 py-3 rounded-2xl bg-[#D4A569] text-black font-semibold"
          >
            Back to Pokedex
          </button>
        </div>

        {/* Empty State */}
        {favoritePokemon.length === 0 ? (
          <div className="text-center text-white/70 text-xl mt-20">
            No favorite Pokémon yet
          </div>
        ) : (
          <PokemonCardsGrid
            displayedPokemon={favoritePokemon}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            fetchPokemonDetails={fetchPokemonDetails}
          />
        )}

        {/* Pokemon Detail Modal */}
        <PokemonDetailModal
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}