import { CharacterSheet } from "./types";
import {
  charactersDatabaseName,
  createDatabaseEntry,
  getDatabaseEntries,
  removeDatabaseEntry,
  updateDatabaseEntry,
} from "./utils";

const initialCharacterSheet: Omit<CharacterSheet, "id"> = {
  characterInfo: {},
  mainStats: {},
  secondaryStats: {
    sanity: {
      max: 99,
      indef: false,
      temp: false,
    },
    hp: {
      majorWound: false,
      dying: false,
      unconcious: false,
    },
    mp: {},
  },
  investigatorSkills: {
    accounting: {
      name: "Accounting",
      startingValue: 5,
    },
    anthropology: { name: "Anthropology", startingValue: 1 },
    appraise: { name: "Appraise", startingValue: 5 },
    archaeology: { name: "Archaeology", startingValue: 1 },
    artCraft: { isCustom: true, label: "Art/Craft", startingValue: 5 },
    charm: { name: "Charm", startingValue: 15 },
    climb: { name: "Climb", startingValue: 20 },
    creditRating: { name: "Credit Rating", startingValue: 0 },
    cthulhuMythos: { name: "Cthulhu Mythos", value: 0, startingValue: 0 },
    disguise: { name: "Disguise", startingValue: 5 },
    dodge: { name: "Dodge" },
    driveAuto: { name: "Drive Auto", startingValue: 20 },
    elecRepair: { name: "Elec Repair", startingValue: 10 },
    fastTalk: { name: "Fast Talk", startingValue: 5 },
    fightingBrawl: { name: "Fighting (Brawl)", startingValue: 25 },
    fighting: { isCustom: true, label: "Fighting" },
    fireArmsHandgun: { name: "Firearms (Handgun)", startingValue: 20 },
    fireArmsRifleShotgun: {
      name: "Firearms (Rifle/Shotgun)",
      startingValue: 25,
    },
    fireArms: { isCustom: true, label: "Firearms" },
    firstAid: { name: "First Aid", startingValue: 30 },
    history: { name: "History", startingValue: 5 },
    intimidate: { name: "Intimidate", startingValue: 15 },
    jump: { name: "Jump", startingValue: 20 },
    languageOther: {
      isCustom: true,
      label: "Language (Other)",
      startingValue: 1,
    },
    languageOwn: { isCustom: true, label: "Language (Own)" },
    law: { name: "Law", startingValue: 5 },
    libraryUse: { name: "Library Use", startingValue: 20 },
    listen: { name: "Listen", startingValue: 20 },
    lockSmith: { name: "Locksmith", startingValue: 1 },
    mechRepair: { name: "Mech. Repair", startingValue: 10 },
    medicine: { name: "Medicine", startingValue: 1 },
    naturalWorld: { name: "Natural World", startingValue: 10 },
    navigate: { name: "Navigate", startingValue: 10 },
    occult: { name: "Occult", startingValue: 5 },
    opHvMachine: { name: "Op. Hv. Machine", startingValue: 1 },
    persuade: { name: "Persuade", startingValue: 10 },
    pilot: { isCustom: true, label: "Pilot", startingValue: 1 },
    psychoAnalysis: { name: "Psychoanalysis", startingValue: 1 },
    psychology: { name: "Psychology", startingValue: 10 },
    ride: { name: "Ride", startingValue: 5 },
    science: {
      isCustom: true,
      label: "Science",
      startingValue: 1,
    },
    sleightOfHand: { name: "Sleight of Hand", startingValue: 10 },
    spotHidden: { name: "Spot Hidden", startingValue: 25 },
    stealth: { name: "Stealth", startingValue: 20 },
    survival: { isCustom: true, label: "Survival", startingValue: 10 },
    swim: { name: "Swim", startingValue: 20 },
    throw: { name: "Throw", startingValue: 20 },
    track: { name: "Track", startingValue: 10 },
    custom1: { isCustom: true },
    custom2: { isCustom: true },
    custom3: { isCustom: true },
    custom4: { isCustom: true },
    custom5: { isCustom: true },
    custom6: { isCustom: true },
    custom7: { isCustom: true },
    custom8: { isCustom: true },
    custom9: { isCustom: true },
    custom10: { isCustom: true },
    custom11: { isCustom: true },
    custom12: { isCustom: true },
  },
  weapons: [{}, {}, {}, {}, {}],
  backstory: {},
  gear: [],
  cashAndAssets: {
    assets: [],
  },
  fellowInvestigators: [{}, {}, {}, {}, {}, {}, {}, {}],
};

export const useCharacterDatabase = () => {
  const getCharacters = (
    onSuccessCallback: (characters: CharacterSheet[]) => void,
  ) => {
    getDatabaseEntries(charactersDatabaseName, onSuccessCallback);
  };

  const updateCharacter = (
    characterSheet: CharacterSheet,
    onSuccessCallback: (characterSheet: CharacterSheet) => void,
  ) => {
    updateDatabaseEntry(
      charactersDatabaseName,
      characterSheet,
      onSuccessCallback,
    );
  };

  const createNewCharacter = (
    onSuccessCallback: (characterSheet: CharacterSheet) => void,
  ) => {
    createDatabaseEntry(
      charactersDatabaseName,
      initialCharacterSheet,
      onSuccessCallback,
    );
  };

  const deleteCharacter = (
    characterSheet: CharacterSheet,
    onSuccessCallback: () => void,
  ) => {
    removeDatabaseEntry(
      charactersDatabaseName,
      characterSheet,
      onSuccessCallback,
    );
  };

  const validateCharacter = (
    loadedCharacter: unknown,
  ): loadedCharacter is CharacterSheet => {
    if (
      typeof loadedCharacter === "object" &&
      !Array.isArray(loadedCharacter) &&
      loadedCharacter !== null
    ) {
      if (
        Object.keys(initialCharacterSheet).every(
          (key) => key in loadedCharacter,
        )
      ) {
        return true;
      }
    }
    return false;
  };

  return {
    updateCharacter,
    getCharacters,
    createNewCharacter,
    deleteCharacter,
    validateCharacter,
  };
};
