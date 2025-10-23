import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SetCurrentPageActionType = {
  targetPage: number;
};

type SetSearchTextActionType = {
  text: string;
};

type TypeFilterActionType = {
  type: PokemonTypes;
};

type SetPokemonAmount = {
  pokemonAmount: number;
};

export type PaginationSliceStateType = {
  currentPage: number;
  pageSize: number;
  searchText: string;
  typeFilter: PokemonTypes[];
  pokemonAmount: number | null;
};

const initialState: PaginationSliceStateType = {
  currentPage: 1,
  pageSize: 12,
  pokemonAmount: null,
  searchText: "",
  typeFilter: [],
};

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<SetCurrentPageActionType>) {
      state.currentPage = action.payload.targetPage;
    },
    setSearchText(state, action: PayloadAction<SetSearchTextActionType>) {
      state.searchText = action.payload.text;
    },
    addTypeFilter(state, action: PayloadAction<TypeFilterActionType>) {
      state.typeFilter.push(action.payload.type);
    },
    removeTypeFilter(state, action: PayloadAction<TypeFilterActionType>) {
      // Loose string comparison
      state.typeFilter.filter(type => type == action.payload.type);
    },
    setPokemonAmount(state, action: PayloadAction<SetPokemonAmount>) {
      state.pokemonAmount = action.payload.pokemonAmount;
    },
  },
});

export const {
  addTypeFilter,
  removeTypeFilter,
  setCurrentPage,
  setPokemonAmount,
  setSearchText,
} = paginationSlice.actions;
