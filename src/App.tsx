import "./App.css";
import { useState, useEffect } from "react";
import { PokemonItem } from "./components/PokemonItem";

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

const URL_POKEAPI =
  "https://gist.githubusercontent.com/nibble-4bits/6191e872f6ea39f3a2c181d3d29a300a/raw/9fbc467a8ab9d561bf3d16cb69a1352cb65597e6/pokedex.json";

export default function App() {
  const [pokemones, setPokemones] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(URL_POKEAPI)
      .then((response) => response.json())
      .then((data) => {
        setPokemones(data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const filteredPokemones =
    filter && !showAll
      ? pokemones.filter(
          (pokemon: any) =>
            pokemon["name"]["english"].toLowerCase() === filter.toLowerCase()
        )
      : pokemones;

  return (
    <div className="App">
      <label htmlFor="filter">Filter: </label>
      <input
        type="text"
        name="filter"
        placeholder="filter by name"
        onChange={(e) => setFilter(e.target.value)}
      />
      Show all:{" "}
      <input
        type="checkbox"
        checked={showAll}
        onChange={() => setShowAll(!showAll)}
      />
      <ul>
        {filteredPokemones.length
          ? filteredPokemones.map((pokemon) => (
              <PokemonItem pokemon={pokemon} />
            ))
          : "No se encontraron pokemones"}
      </ul>
    </div>
  );
}
