"use client";
import { useEffect } from "react";

import { useGetPokemonsQuery } from "@/lib/slices/pokemonSlice";

import { setPokemonAmount } from "@/lib/slices/paginationSlice";
import { RootStateType } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "./components/card";
import Pagination from "./components/pagination";
import Search from "./components/search";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { currentPage, pageSize, searchText, typeFilter, pokemonAmount } =
    useSelector((state: RootStateType) => state.pagination);

  const { data } = useGetPokemonsQuery({
    currentPage,
    pageSize,
    searchText,
    types: typeFilter,
  });

  useEffect(() => {
    // Saves pokemon amount for the first request only
    if (!data?.count || pokemonAmount) return;

    dispatch(setPokemonAmount({ pokemonAmount: data.count }));
  }, [data?.count]);

  return (
    <div className="mx-auto mb-8 w-11/12 max-w-5xl rounded-2xl bg-white p-10 6xl:w-full">
      <Search />
      <div className="grid grid-cols-1 place-items-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pokemonList?.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="mt-7 flex justify-center gap-6">
        <Pagination />
      </div>
    </div>
  );
}
