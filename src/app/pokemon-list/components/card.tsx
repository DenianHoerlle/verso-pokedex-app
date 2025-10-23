import Image from "next/image";
import Type from "./type";

type PokemonCardType = {
  pokemon: Pokemon;
};

const PokemonCard = ({ pokemon }: PokemonCardType) => {
  const { image, name, types } = pokemon;

  return (
    <div
      key={name}
      className="flex flex-col items-center rounded-2xl shadow-(--card-shadow)"
    >
      <div className="bg-gray-100">
        <Image src={image} width={250} height={250} alt={name} />
      </div>
      <div className="flex flex-col gap-2 py-3 text-center">
        <span className="text-xl capitalize">{name}</span>
        <div className="flex justify-center gap-2">
          {types.map(type => (
            <Type type={type} key={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
