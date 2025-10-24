import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetPokemonsResult = {
  pokemonList: Pokemon[];
};

type GetPokemonsParams = {
  currentPage?: number;
  pageSize?: number;
  searchText?: string;
  types?: string;
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/pokemon-list",
  }),
  endpoints: builder => ({
    getPokemons: builder.query<GetPokemonsResult, GetPokemonsParams>({
      query: ({ currentPage, pageSize, searchText, types }) =>
        `?currentPage=${currentPage || 1}&pageSize=${pageSize || 10}&searchText=${searchText || ""}&types=${types || ""}`,
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
