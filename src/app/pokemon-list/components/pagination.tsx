"use client";

import { setCurrentPage } from "@/lib/slices/paginationSlice";
import { RootStateType } from "@/lib/store";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, pageSize, pokemonAmount } = useSelector(
    (state: RootStateType) => state.pagination,
  );

  const numberOfPages = useMemo(() => {
    if (!pokemonAmount) return;

    return Math.ceil(pokemonAmount / pageSize);
  }, [pokemonAmount]);

  const handlePageChange = (targetPage: number) => {
    if (!numberOfPages) return;

    if (targetPage <= 0 || targetPage > numberOfPages) return;

    dispatch(setCurrentPage({ targetPage }));
  };

  const renderPaginationButton = (text: string, onClick: () => void) => {
    const isActive = currentPage === parseInt(text);

    const buttonClassNames = isActive
      ? "bg-poke-primary text-poke-secondary scale-105"
      : "bg-poke-secondary text-white hover:bg-poke-primary hover:text-poke-secondary";

    return (
      <button
        key={text}
        onClick={onClick}
        className={`w-10 cursor-pointer rounded-md border-poke-secondary px-2 py-0.5 text-xl uppercase transition ${buttonClassNames}`}
      >
        {text}
      </button>
    );
  };

  const renderNumberedPages = () => {
    if (!numberOfPages) return null;

    let initialPosition = currentPage - 1;
    let lastPosition = currentPage + 1;

    if (initialPosition <= 0) {
      initialPosition = 1;
      lastPosition += 1;
    }

    if (lastPosition > numberOfPages) {
      initialPosition -= 1;
      lastPosition = numberOfPages;
    }

    const paginationButtons = [];

    for (let i = initialPosition; i <= lastPosition; i++) {
      paginationButtons.push(
        renderPaginationButton(`${i}`, () => handlePageChange(i)),
      );
    }

    return paginationButtons;
  };

  return (
    <div className="flex justify-center gap-3">
      {renderPaginationButton("<", () => handlePageChange(currentPage - 1))}
      {renderNumberedPages()}
      {renderPaginationButton(">", () => handlePageChange(currentPage + 1))}
    </div>
  );
};

export default Pagination;
