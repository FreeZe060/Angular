const { fetchAllPokemons, fetchPokemonById } = require("../services/pokemonService");

exports.getAllPokemon = async (req, res) => {
    try {
        const { name, type, sortBy } = req.query;
        let pokemons = await fetchAllPokemons();

        if (name) {
            const lowerCaseName = name.toLowerCase();
            pokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(lowerCaseName));
        }

        if (type) {
            pokemons = pokemons.filter(pokemon => pokemon.types?.includes(type));
        }

        if (sortBy === "name") {
            pokemons.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "hp") {
            pokemons.sort((a, b) => (b.hp || 0) - (a.hp || 0));
        }

        res.json(pokemons);
    } catch (error) {
        console.error("Erreur API:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des Pokémon" });
    }
};

exports.getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await fetchPokemonById(id);
        res.json(pokemon);
    } catch (error) {
        console.error("Erreur API:", error);
        res.status(500).json({ error: "Erreur lors de la récupération du Pokémon" });
    }
};
