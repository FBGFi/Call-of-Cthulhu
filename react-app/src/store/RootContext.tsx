import React from "react";
import {
  appVersion,
  charactersDatabaseName,
  createContext,
  dataBaseName,
  roomsDatabaseName,
} from "./utils/utils";
import { useContextReducer } from "./utils/useContextReducer";
import { CharacterSheet } from "./utils/types";
import { useCharacterDatabase } from "./utils/useCharacterDatabase";

interface RootState {
  client?: "HOST" | "PLAYER";
  currentCharacter?: CharacterSheet;
  isLoading: boolean;
}

const initialState: RootState = {
  isLoading: false,
};

const RootContext = createContext(initialState);

export const RootContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { state, dispatch } = useContextReducer(initialState);
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};

/**
 * Main state of the app
 */
export const useRootContext = () => {
  const { state, dispatch } = React.useContext(RootContext);
  const { updateCharacter, deleteCharacter } = useCharacterDatabase();

  const setClient = (client: RootState["client"]) =>
    dispatch((state) => ({ ...state, client }));

  const setCurrentCharacter = (
    characterSheet: RootState["currentCharacter"],
  ) => {
    state.currentCharacter?.id !== characterSheet?.id &&
      dispatch((state) => ({ ...state, isLoading: true }));
    if (!characterSheet)
      dispatch((state) => ({
        ...state,
        currentCharacter: characterSheet,
        isLoading: false,
      }));
    else
      updateCharacter(characterSheet, (savedValue) =>
        dispatch((state) => ({
          ...state,
          currentCharacter: savedValue,
          isLoading: false,
        })),
      );
  };

  const deleteCurrentCharacter = () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this character?",
    );
    if (confirmDeletion && state.currentCharacter) {
      deleteCharacter(state.currentCharacter, () =>
        dispatch((state) => ({ ...state, currentCharacter: undefined })),
      );
    }
  };

  const createStores = () => {
    const openRequest = indexedDB.open(dataBaseName, appVersion);

    openRequest.onerror = () => console.error(openRequest.error);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(charactersDatabaseName)) {
        db.createObjectStore(charactersDatabaseName, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(roomsDatabaseName)) {
        db.createObjectStore(roomsDatabaseName, { keyPath: "id" });
      }
    };
  };

  React.useEffect(() => {
    createStores();
  }, []);

  return {
    state,
    setClient,
    setCurrentCharacter,
    deleteCurrentCharacter,
  };
};
