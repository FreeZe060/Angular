const express = require('express');
const router = express.Router();
const { getAllPokemon, getPokemonById } = require("../controllers/pokemonController");

router.get("/", getAllPokemon);
router.get("/:id", getPokemonById);

module.exports = router;