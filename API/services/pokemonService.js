const POKEMON_API_URL = "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1%20TO%20151]&pageSize=10";

const fetchAllPokemons = async () => {
    try {
        const response = await fetch(POKEMON_API_URL);
        if (!response.ok) throw new Error("Erreur lors de la récupération des Pokémon");
        
        const data = await response.json();
        return data.data.map(pokemon => ({
            ...pokemon,
            prices: pokemon.cardmarket?.prices?.averageSellPrice ?? 0 
        }));
    } catch (error) {
        console.error("Erreur API:", error);
        return []; 
    }
};


const fetchPokemonById = async (id) => {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    const data = await response.json();
    return data.data;
};

module.exports = { fetchAllPokemons, fetchPokemonById };
