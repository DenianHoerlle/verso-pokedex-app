import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetPokemonsResult = {
  pokemonList: Pokemon[];
  lastId?: number;
  count?: number;
};

type GetPokemonsParams = {
  currentPage?: number;
  pageSize?: number;
  searchText?: string;
  types?: PokemonTypes[];
};

const buildQuery = ({
  currentPage,
  pageSize,
  searchText,
  types,
}: GetPokemonsParams) => {
  const params = [];

  if (currentPage) params.push(`currentPage=${currentPage}`);
  if (pageSize) params.push(`pageSize=${pageSize}`);
  if (searchText) params.push(`searchText=${searchText}`);
  if (types?.length) params.push(`types=${types}`);

  if (!params.length) return "";

  return ["?", ...params].join("&");
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/pokemon-list",
  }),
  endpoints: builder => ({
    getPokemons: builder.query<GetPokemonsResult, GetPokemonsParams>({
      query: buildQuery,
    }),
  }),
});

export const { useGetPokemonsQuery, useLazyGetPokemonsQuery } = pokemonApi;
