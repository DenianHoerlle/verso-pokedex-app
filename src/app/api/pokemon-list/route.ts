import { NextRequest } from "next/server";
import pokemonData from "pokemon-data";

const { pokemonList, count } = pokemonData;

export async function GET(request: NextRequest) {
  const currentPage =
    parseInt(request?.nextUrl?.searchParams.get("currentPage") || "") || 1;
  const pageSize =
    parseInt(request?.nextUrl?.searchParams.get("pageSize") || "") || 10;

  const textFilter = request?.nextUrl?.searchParams.get("searchText");
  const typeFilter = request?.nextUrl?.searchParams
    .get("types")
    ?.split(",") as PokemonTypes[];

  const firstPosition = (currentPage - 1) * pageSize;
  const lastPosition = firstPosition + pageSize;

  if (textFilter || typeFilter) {
    const matchesTypes = (pokemon: Pokemon) => {
      if (!typeFilter.length) return true;

      return (
        pokemon.types.findIndex(
          type => type === typeFilter[0] || type === typeFilter[1],
        ) >= 0
      );
    };

    const matchesText = (pokemon: Pokemon) => {
      if (!textFilter) return true;

      return !!pokemon.name.includes(textFilter);
    };

    const filteredPokemonList: Pokemon[] = [];

    for (const pokemon of pokemonList) {
      if (!matchesTypes(pokemon)) continue;

      if (!matchesText(pokemon)) continue;

      filteredPokemonList.push(pokemon);

      if (filteredPokemonList.length >= pageSize) break;
    }

    return Response.json({
      pokemonList: filteredPokemonList,
    });
  }

  return Response.json({
    pokemonList: pokemonList.slice(firstPosition, lastPosition),
    count,
  });
}
