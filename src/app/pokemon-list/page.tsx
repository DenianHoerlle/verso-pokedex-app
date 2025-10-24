"use client";
import { useState } from "react";

import { useGetPokemonsQuery } from "@/lib/slices/pokemonSlice";

import PokemonCard from "./components/card";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetPokemonsQuery({
    currentPage,
    pageSize: 10,
  });

  return (
    <div className="grid grid-cols-1 place-items-center gap-10 px-10 py-4 md:grid-cols-3 lg:grid-cols-4">
      {data?.pokemonList?.map(pokemon => (
        <PokemonCard pokemon={pokemon} />
      ))}
      <div className="flex max-w-lg gap-6">
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          prev
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
      </div>
    </div>
  );
}
