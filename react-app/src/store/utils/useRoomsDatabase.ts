import { Room } from "./types";
import {
  createDatabaseEntry,
  getDatabaseEntries,
  roomsDatabaseName,
  updateDatabaseEntry,
} from "./utils";

const initialRoom: Omit<Room, "id"> = {};

export const useRoomsDataBase = () => {
  const getRooms = (onSuccessCallback: (rooms: Room[]) => void) => {
    getDatabaseEntries(roomsDatabaseName, onSuccessCallback);
  };

  const updateRoom = (room: Room, onSuccessCallback: (room: Room) => void) => {
    updateDatabaseEntry(roomsDatabaseName, room, onSuccessCallback);
  };

  const createNewRoom = (onSuccessCallback: (room: Room) => void) => {
    createDatabaseEntry(roomsDatabaseName, initialRoom, onSuccessCallback);
  };

  return { getRooms, createNewRoom, updateRoom };
};
