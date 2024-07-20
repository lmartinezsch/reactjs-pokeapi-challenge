interface IImage {
  sprite: string;
  thumbnail: string;
  hires: string;
}

interface IPokemonName {
  english: string;
}

interface IBaseStats {
  [key: string]: number;
}

interface IPokemonProps {
  name: IPokemonName;
  type: string[];
  description: string;
  base: IBaseStats;
  image: IImage;
}

interface IPokemon {
  pokemon: IPokemonProps;
}

export const PokemonItem = (props: IPokemon) => {
  const { pokemon } = props;
  return (
    <li>
      <div style={{ display: "flex" }}>
        <div id="item1">
          <img
            src={pokemon.image.thumbnail}
            alt={pokemon.name.english}
            width={100}
            height={100}
          />
        </div>
        <div
          id="item2"
          style={{ width: 600, textAlign: "left", paddingLeft: "20px" }}
        >
          <p>
            <strong>Name:</strong> {pokemon.name.english}
          </p>
          <p>
            <strong>Type:</strong> {pokemon.type.join(", ")}
          </p>
          <p>
            <strong>Description:</strong> {pokemon.description}
          </p>
          <p>
            <strong>Bases:</strong>
            Hp:
            {pokemon.base.HP}
            Attack:
            {pokemon.base.Attack}
          </p>
        </div>
      </div>

      <p></p>
    </li>
  );
};
