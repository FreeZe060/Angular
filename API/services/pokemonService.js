const POKEMON_API_URL = "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1%20TO%20151]&pageSize=10";

const fetchAllPokemons = async () => {
    const response = await fetch(POKEMON_API_URL);
    const data = await response.json();
    return data.data;
};

const fetchPokemonById = async (id) => {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    const data = await response.json();
    return data.data;
};

module.exports = { fetchAllPokemons, fetchPokemonById };
