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

  const renderPaginationButton = (text: string, onClick: () => void) => {
    return (
      <button
        onClick={onClick}
        className="cursor-pointer rounded-md border border-black px-2 py-0.5 uppercase transition hover:bg-black hover:text-white"
      >
        {text}
      </button>
    );
  };

  return (
    <div className="mx-auto mb-8 w-11/12 max-w-5xl rounded-2xl bg-white 6xl:w-full">
      <div className="grid grid-cols-1 place-items-center gap-10 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pokemonList?.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-center gap-6 py-2">
        {renderPaginationButton(
          "prev",
          () => currentPage > 1 && setCurrentPage(currentPage - 1),
        )}
        {renderPaginationButton("next", () => setCurrentPage(currentPage + 1))}
      </div>
    </div>
  );
}
