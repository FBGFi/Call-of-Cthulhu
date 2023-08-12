import React from "react";
import { Context, DatabaseEntry, ReducerCallback } from "./types";

export const createContext = <T>(initialState: T) =>
  React.createContext<Context<T>>({
    state: initialState,
    dispatch: (state) => state,
  });

export const createReducer =
  <TState>() =>
  (state: TState, callback: ReducerCallback<TState>) =>
    callback(state);

export const appVersion = 1;
export const dataBaseName = "CALL_OF_CTHULHU";
export const charactersDatabaseName = "characters";
export const roomsDatabaseName = "rooms";

export const openDatabaseConnection = (
  onSuccessCallback: (db: IDBDatabase) => void,
) => {
  const openRequest = indexedDB.open(dataBaseName, appVersion);

  openRequest.onerror = () => console.error(openRequest.error);

  openRequest.onsuccess = () => onSuccessCallback(openRequest.result);
};

export const getStore = (
  storeName: string,
  db: IDBDatabase,
  mode: IDBTransactionMode,
) => db.transaction(storeName, mode).objectStore(storeName);

export const getDatabaseEntries = <T>(
  storeName: string,
  onSuccessCallback: (entries: T[]) => void,
) => {
  openDatabaseConnection((db) => {
    const store = getStore(storeName, db, "readonly");

    const request = store.getAll();

    request.onsuccess = () => onSuccessCallback(request.result);
  });
};

export const createDatabaseEntry = <
  TEntry extends Omit<DatabaseEntry, "id">,
  TResult extends DatabaseEntry,
>(
  storeName: string,
  entry: TEntry,
  onSuccessCallback: (entry: TResult) => void,
) => {
  const id = Date.now();
  openDatabaseConnection((db) => {
    const store = getStore(storeName, db, "readwrite");
    const request = store.add({ id, ...entry });

    request.onsuccess = () => {
      const request = store.get(id);
      request.onsuccess = () => onSuccessCallback(request.result);
    };
  });
};

export const updateDatabaseEntry = <T extends DatabaseEntry>(
  storeName: string,
  entry: T,
  onSuccessCallback: (entry: T) => void,
) => {
  openDatabaseConnection((db) => {
    const store = getStore(storeName, db, "readwrite");
    const request = store.put(entry);

    request.onsuccess = () => {
      const request = store.get(entry.id);
      request.onsuccess = () => onSuccessCallback(request.result);
    };
  });
};

export const removeDatabaseEntry = <T extends DatabaseEntry>(
  storeName: string,
  entry: T,
  onSuccessCallback: () => void,
) => {
  openDatabaseConnection((db) => {
    const store = getStore(storeName, db, "readwrite");
    const request = store.delete(entry.id);

    request.onsuccess = () => {
      onSuccessCallback();
    };
  });
};
