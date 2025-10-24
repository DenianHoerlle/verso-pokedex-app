"use client";
import Image from "next/image";

import { setSelectedPokemon } from "@/lib/slices/paginationSlice";
import { RootStateType } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Type from "./type";

const maxStatValue = 255;

const statNames: { [key in string]: string } = {
  hp: "hp",
  attack: "atk",
  "special-attack": "sp. atk",
  defense: "def",
  "special-defense": "sp. def",
  speed: "speed",
};

const getColorByValue = (value: number) => {
  if (value < 60) return "bg-red-400";
  if (value < 90) return "bg-orange-400";
  return "bg-green-400";
};

const Modal = () => {
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(
    (state: RootStateType) => state.pagination.selectedPokemon,
  );

  useEffect(() => {
    if (selectedPokemon) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    if (!selectedPokemon) document.body.style.overflow = "auto";
  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  const { image, name, types, abilities, stats } = selectedPokemon;

  const handleCloseModal = () =>
    dispatch(setSelectedPokemon({ selectedPokemon: null }));

  const renderStat = (stat: { name: string; value: number }) => {
    const sizeByValue = `${Math.round((stat.value / maxStatValue) * 100)}%`;

    const statName = statNames[stat.name];

    return (
      <div key={stat.name} className="flex w-full items-center gap-3">
        <span className="w-3/12 text-right whitespace-nowrap text-gray-400 uppercase md:w-2/12">
          {statName}
        </span>
        <span className="w-1/12 text-center font-bold">{stat.value}</span>
        <div className="flex h-min w-full items-center overflow-hidden rounded-2xl bg-gray-100">
          <div
            style={{
              width: sizeByValue,
            }}
            className={`min-h-4 rounded-2xl ${getColorByValue(stat.value)}`}
          ></div>
        </div>
        <div className="w-1/12 text-center font-bold">{maxStatValue}</div>
      </div>
    );
  };

  return (
    <div
      onClick={handleCloseModal}
      className="absolute top-1/2 left-1/2 flex h-full w-full transform-(--center-absolute) cursor-pointer items-center justify-center bg-black-transparent"
    >
      <div
        className="flex h-4/5 w-full cursor-auto flex-col bg-white md:max-w-6xl md:flex-row"
        onClick={event => event.stopPropagation()}
      >
        <div className="relative flex-1">
          <Image src={image} alt={name} fill />
        </div>
        <div className="flex flex-1 flex-col items-center gap-3 p-3">
          <span className="text-2xl uppercase">{name}</span>
          <div className="flex gap-3">
            {types.map(type => (
              <Type key={type} type={type} />
            ))}
          </div>
          <div className="flex">
            <span className="mr-3">Abilities: </span>
            {abilities.map(ability => (
              <span
                key={ability}
                className="mx-0.5 rounded-2xl border px-2 py-0.5"
              >
                {ability}
              </span>
            ))}
          </div>
          <div className="w-full gap-2">
            {stats.map(stat => renderStat(stat))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
