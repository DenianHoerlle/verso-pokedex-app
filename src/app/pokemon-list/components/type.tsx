const typeColors = {
  normal: "bg-normal",
  fire: "bg-fire",
  water: "bg-water",
  electric: "bg-electric",
  grass: "bg-grass",
  ice: "bg-ice",
  fighting: "bg-fighting",
  poison: "bg-poison",
  ground: "bg-ground",
  flying: "bg-flying",
  psychic: "bg-psychic",
  bug: "bg-bug",
  rock: "bg-rock",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  dark: "bg-dark",
  steel: "bg-steel",
  fairy: "bg-fairy",
};

type TypeType = {
  type: PokemonTypes;
};

const Type = ({ type }: TypeType) => {
  return (
    <span className={`rounded-md px-2 uppercase ${typeColors[type]}`}>
      {type}
    </span>
  );
};

export default Type;
