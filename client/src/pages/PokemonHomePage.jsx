import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import PokemonDetailModal from "../components/PokemonDetailModal";
import FavoritesPage from "./FavoritesPage";
import CustomTypeDropdown from "../customUI/CustomTypeDropdown";
import Navbar from "../components/Navbar";
import { getSession, POKEDEX_SESSION_EVENT } from "../../utils/session";
import { getFavoriteIds, setFavoriteIds } from "../../utils/favoritesStorage";
import PokemonCardsGrid from "../customUI/PokemonCardsGrid";

export default function PokedexHomePage() {
    const [pokemonList, setPokemonList] = useState([]);
    const [displayedPokemon, setDisplayedPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
   const [selectedPokemon, setSelectedPokemon] = useState(null);

    const [showFavorites, setShowFavorites] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [favorites, setFavorites] = useState([]);
    const favoritesRef = useRef([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const cardsPerPage = 20;

    useEffect(() => {
        function syncFavoritesFromSession() {
            const email = getSession()?.email;
            setFavorites(email ? getFavoriteIds(email) : []);
        }
        syncFavoritesFromSession();
        window.addEventListener(POKEDEX_SESSION_EVENT, syncFavoritesFromSession);
        return () =>
            window.removeEventListener(
                POKEDEX_SESSION_EVENT,
                syncFavoritesFromSession
            );
    }, []);

    useEffect(() => {
        favoritesRef.current = favorites;
    }, [favorites]);

    const toggleFavorite = (pokemonId) => {
        const prev = favoritesRef.current;
        const removing = prev.includes(pokemonId);
        const next = removing
            ? prev.filter((id) => id !== pokemonId)
            : [...prev, pokemonId];
        const email = getSession()?.email;
        if (email) setFavoriteIds(email, next);
        setFavorites(next);

        const name =
            pokemonList.find((p) => p.id === pokemonId)?.name ?? "Pokémon";
        if (removing) {
            toast.info(`Removed ${name} from favorites`);
        } else {
            toast.success(`Added ${name} to favorites`);
        }
    };

   
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=150"
                );

                const data = await response.json();

                const detailedPokemon = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        const details = await res.json();

                        return {
                            id: details.id,
                            name:
                                details.name.charAt(0).toUpperCase() +
                                details.name.slice(1),
                            type: details.types?.[0]?.type?.name || "Unknown",
                            image:
                                details.sprites?.other?.["official-artwork"]
                                    ?.front_default ||
                                details.sprites?.front_default ||
                                "https://via.placeholder.com/150",
                        };
                    })
                );

                setPokemonList(detailedPokemon);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to load Pokémon");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    const fetchPokemonDetails = async (pokemonName) => {
        try {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
            );

            const details = await res.json();

            setSelectedPokemon({
                id: details.id,
                name:
                    details.name.charAt(0).toUpperCase() +
                    details.name.slice(1),

                type: details.types?.[0]?.type?.name || "Unknown",

                image:
                    details.sprites?.other?.["official-artwork"]
                        ?.front_default ||
                    details.sprites?.front_default,

                hp: details.stats?.[0]?.base_stat || 0,
                attack: details.stats?.[1]?.base_stat || 0,
                defense: details.stats?.[2]?.base_stat || 0,
                speed: details.stats?.[5]?.base_stat || 0,

                height: details.height || 0,
                weight: details.weight || 0,
                base_experience: details.base_experience || 0,

                abilities:
                    details.abilities?.map(
                        (item) => item.ability.name
                    ) || [],

                moves:
                    details.moves?.slice(0, 8).map(
                        (item) => item.move.name
                    ) || [],
            });
        } catch (error) {
            console.error(error);
        }
    };

   
    useEffect(() => {
        let filteredPokemon = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedType !== "All Types") {
            filteredPokemon = filteredPokemon.filter(
                (pokemon) =>
                    pokemon.type.toLowerCase() === selectedType.toLowerCase()
            );
        }

        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;

        setDisplayedPokemon(
            filteredPokemon.slice(startIndex, endIndex)
        );
    }, [pokemonList, currentPage, searchTerm, selectedType]);


    const filteredPokemon = pokemonList.filter((pokemon) => {
        const matchesSearch = pokemon.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesType =
            selectedType === "All Types" ||
            pokemon.type.toLowerCase() === selectedType.toLowerCase();

        return matchesSearch && matchesType;
    });

    const totalPages = Math.ceil(
        filteredPokemon.length / cardsPerPage
    );

    
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

   
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-[#1F1611]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center text-white text-xl font-semibold min-h-0 py-12 px-4">
                    Loading Pokémon...
                </div>
            </div>
        );
    }

   
    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-[#1F1611]">
                <Navbar />
                <div className="flex-1 flex items-center justify-center text-red-400 text-xl font-semibold min-h-0 py-12 px-4">
                    {error}
                </div>
            </div>
        );
    }

 if (showFavorites) {
    return (
        <div className="min-h-screen flex flex-col bg-[#1F1611]">
            <Navbar />

            <FavoritesPage
                favorites={favorites}
                pokemonList={pokemonList}
                setShowFavorites={setShowFavorites}
                toggleFavorite={toggleFavorite}
                fetchPokemonDetails={fetchPokemonDetails}
            />

            <PokemonDetailModal
                selectedPokemon={selectedPokemon}
                setSelectedPokemon={setSelectedPokemon}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
            />
        </div>
    );
}


    return (
        <div className="min-h-screen flex flex-col bg-[#1F1611] text-white">
            <Navbar />
            <div className="flex-1 px-4 md:px-8 py-8 min-h-0">
                <div className="max-w-7xl mx-auto">

                    
                    <div className="mb-10 rounded-[32px] bg-gradient-to-r from-[#1F1611] via-[#523828] to-[#D4A569] p-8 md:p-12 shadow-2xl">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            <div>
                                <p className="text-sm uppercase tracking-[4px] text-white/80 mb-3">
                                    Welcome Trainer
                                </p>

                                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                    Pokedex <span className="text-[#D4A569]">Lite</span>
                                </h1>

                                <p className="mt-4 text-white/90 max-w-xl text-lg">
                                    Discover, search, and collect your favorite Pokémon
                                    with a beautiful modern Pokédex experience.
                                </p>
                            </div>



                            <button
                                onClick={() => setShowFavorites(true)}
                                className="px-6 py-4 rounded-2xl bg-[#523828] text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                View Favorites ♡
                            </button>
                        </div>
                    </div>

                    
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[28px] p-4 mb-10 shadow-xl relative overflow-visible z-50">
                        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">

                            
                            <input
                                type="text"
                                placeholder="Search Pokémon..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="md:col-span-7 w-full px-5 py-3 rounded-2xl bg-white/[0.03] border border-[#D4A569] text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A569]"
                            />

                            {/* Filter */}
                            <CustomTypeDropdown
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>

                   
                    <PokemonCardsGrid
                        displayedPokemon={displayedPokemon}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                        fetchPokemonDetails={fetchPokemonDetails}
                    />

                    
                    <div className="flex justify-center items-center gap-4 mt-12">

                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 text-xl font-bold"
                        >
                            {"<"}
                        </button>

                        <div className="px-5 py-3 rounded-2xl bg-[#D4A569] text-black font-semibold">
                            {currentPage}/8
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 text-xl font-bold"
                        >
                            {">"}
                        </button>

                    </div>
                </div>
                <PokemonDetailModal    selectedPokemon={selectedPokemon}    setSelectedPokemon={setSelectedPokemon}    favorites={favorites}    toggleFavorite={toggleFavorite}/>
            </div> 
        </div>
    );
}