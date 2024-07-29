// Objective:
// Create a React app that displays a list of pokemons along with their information

// Requirements:
// Display a list of pokemons with the data available in this URL:
// https://gist.githubusercontent.com/nibble-4bits/6191e872f6ea39f3a2c181d3d29a300a/raw/9fbc467a8ab9d561bf3d16cb69a1352cb65597e6/pokedex.json
// For each pokemon, you should display the following information:
// - name
// - types
// - description
// - HP, Attack and Defense stats
// - thumbnail image

// Add a text field that allows the user to filter pokemons.
// When the user types in this text field, display only the pokemons
// whose name matches the input entered by the user

// Add a toggle that when enabled, displays all pokemons,
// regardless of whatever input has been entered in the text field.
// If disabled, display only the filtered pokemons

import { useState, useEffect } from "react";

const POKEMONES_API =
  "https://gist.githubusercontent.com/nibble-4bits/6191e872f6ea39f3a2c181d3d29a300a/raw/9fbc467a8ab9d561bf3d16cb69a1352cb65597e6/pokedex.json";

interface IBase {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
}

interface IPokemon {
  name: string;
  type: string[];
  description: string;
  base: IBase;
  thumbnail: string;
}

export default function App() {
  const [pokemones, setPokemones] = useState<IPokemon[]>([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(POKEMONES_API)
      .then((res) => res.json())
      .then((body) => {
        const pokemonesArray: IPokemon[] = [];
        body.map((pokemon: any) => {
          const pokemonObject = {
            name: pokemon.name.english,
            type: pokemon.type,
            description: pokemon.description,
            base: pokemon.base,
            thumbnail: pokemon.image.thumbnail,
          };
          pokemonesArray.push(pokemonObject);
        });
        setPokemones(pokemonesArray);
      });
  }, []);

  const filteredPokemones =
    filter && !showAll
      ? pokemones.filter(
          (pokemon) => pokemon.name.toLowerCase() === filter.toLowerCase()
        )
      : pokemones;

  return (
    <>
      <h1>Pokemon List:</h1>
      <input
        type="text"
        placeholder="Bulbasaur"
        name="filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      <input
        type="checkbox"
        checked={showAll}
        onChange={() => setShowAll(!showAll)}
      />

      <ul>
        {filteredPokemones.map((pokemon) => (
          <li>
            Name: {pokemon.name} <br />
            Types: {pokemon.type.join(", ")} <br />
            description: {pokemon.description} <br />
            HP: {pokemon.base.HP} - Attack: {pokemon.base.Attack} - SP Attack:{" "}
            {pokemon.base["Sp. Attack"]} - Sp Defense:{" "}
            {pokemon.base["Sp. Defense"]} - Speed: {pokemon.base.Speed} <br />
            Thumbnail: <img src={pokemon.thumbnail} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </>
  );
}
