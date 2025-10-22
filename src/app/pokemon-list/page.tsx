"use client";
import { useGetPokemonsQuery } from "@/lib/slices/pokemonSlice";
import { useState } from "react";

export default function PokemonList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetPokemonsQuery({
    currentPage,
    pageSize: 10,
  });

  return (
    <div className="grid grid-cols-1 gap-3 px-10">
      {data?.pokemonList?.map(({ name }) => (
        <span>{name}</span>
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
