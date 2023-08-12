import React from "react";
import { createReducer } from "./utils";

export const useContextReducer = <TState,>(initialState: TState) => {
  const [state, dispatch] = React.useReducer(
    createReducer<TState>(),
    initialState,
  );
  return { state, dispatch };
};
