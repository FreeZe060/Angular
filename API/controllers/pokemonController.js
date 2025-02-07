const { fetchAllPokemons, fetchPokemonById } = require("../services/pokemonService");

exports.getAllPokemon = async (req, res) => {
    try {
        let pokemons = await fetchAllPokemons();

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