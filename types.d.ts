type Pokemon = {
  id: number;
  name: string;
  abilities: string[];
  types: PokemonTypes[];
  image: string;
  stats: { name: string; value: number }[];
};

type PokemonTypes =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

declare module "pokemon-data" {
  export const pokemonList: Pokemon[];
  export const count: number;
}
