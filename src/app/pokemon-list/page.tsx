"use client";
import { useEffect } from "react";

import { useGetPokemonsQuery } from "@/lib/slices/pokemonSlice";

import { RootStateType } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

import { setPokemonAmount } from "@/lib/slices/paginationSlice";
import { Modal, Pagination, PokemonCard, Search } from "./components/";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { currentPage, pageSize, searchText, typeFilter, pokemonAmount } =
    useSelector((state: RootStateType) => state.pagination);

  const { data, isFetching } = useGetPokemonsQuery({
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

  const renderPokemonList = () => {
    if (isFetching)
      return Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[250] w-full flex-1 animate-pulse rounded-2xl bg-gray-200"
        />
      ));

    return data?.pokemonList?.map(pokemon => (
      <PokemonCard key={pokemon.name} pokemon={pokemon} />
    ));
  };

  return (
    <>
      <div className="mx-auto mb-8 w-11/12 max-w-5xl rounded-2xl bg-white p-10 6xl:w-full">
        <Search />
        <div className="grid grid-cols-1 place-items-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renderPokemonList()}
        </div>
        <div className="mt-7 flex justify-center gap-6">
          <Pagination />
        </div>
      </div>
      <Modal />
    </>
  );
}
