"use client";
import {
  addTypeFilter,
  removeTypeFilter,
  setSearchText,
} from "@/lib/slices/paginationSlice";
import { RootStateType } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Type from "./type";

const PokemonTypes: PokemonTypes[] = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const debounceTimer = 500;

const Search = () => {
  const [text, setText] = useState("");
  const debounce = useRef<NodeJS.Timeout | null>(null);

  const selectedTypes = useSelector(
    (state: RootStateType) => state.pagination.typeFilter,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);

    if (!text.length) {
      handleSearch();
      return;
    }

    const timer = setTimeout(handleSearch, debounceTimer);

    debounce.current = timer;
  }, [text]);

  const handleSearch = () => {
    dispatch(setSearchText({ text }));
  };

  const handleOnClick = (type: PokemonTypes) => {
    if (selectedTypes.includes(type))
      return dispatch(removeTypeFilter({ type }));

    if (selectedTypes.length >= 2) return;

    dispatch(addTypeFilter({ type }));
  };

  const getButtonClassNames = (type: PokemonTypes) => {
    if (!selectedTypes.length) return "opacity-100";
    if (selectedTypes.includes(type)) return "opacity-100 scale-105";
    return "opacity-50";
  };
  return (
    <div className="mb-10">
      <input
        value={text}
        onChange={event => setText(event.target.value)}
        className="w-full rounded-2xl px-4 py-1 shadow-(--card-shadow) transition focus:shadow-(--input-shadow-focus) focus:outline-0"
      />
      <div className="mt-4 flex flex-wrap justify-center gap-1">
        {PokemonTypes.map(type => (
          <button
            key={type}
            onClick={() => handleOnClick(type)}
            className={`cursor-pointer transition ${getButtonClassNames(type)}`}
          >
            <Type type={type} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Search;
