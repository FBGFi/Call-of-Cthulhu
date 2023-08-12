import React from "react";

export type ReducerCallback<TState> = (state: TState) => TState;

export interface Context<TState> {
  state: TState;
  dispatch: React.Dispatch<ReducerCallback<TState>>;
}

export interface DatabaseEntry {
  id: number;
}

export interface Room extends DatabaseEntry {}

export interface CharacterInfo {
  characterName?: string;
  playerName?: string;
  occupatice?: string;
  age?: number;
  residence?: string;
  birthPlace?: string;
  sex?: "Male" | "Female" | "Other";
  image?: {
    title: string;
    src: string;
  };
}

export interface MainStats {
  str?: number;
  dex?: number;
  pow?: number;
  con?: number;
  app?: number;
  edu?: number;
  siz?: number;
  int?: number;
  moveRate?: number;
}

export interface SanityValues {
  max: number;
  starting?: number;
  current?: number;
  indef: boolean;
  temp: boolean;
}

export interface HitPointValues {
  majorWound: boolean;
  dying: boolean;
  unconcious: boolean;
  max?: number;
  starting?: number;
  current?: number;
}

export interface ManapointValues {
  max?: number;
  current?: number;
}

export interface SecondaryStats {
  sanity: SanityValues;
  hp: HitPointValues;
  mp: ManapointValues;
  luck?: number;
}

export interface InvestigatorSkill {
  isCustom?: boolean;
  label?: string;
  name?: string;
  startingValue?: number;
  value?: number;
  isChecked?: boolean;
}

export interface InvestigatorSkills {
  accounting: InvestigatorSkill;
  fastTalk: InvestigatorSkill;
  law: InvestigatorSkill;
  science: InvestigatorSkill;
  anthropology: InvestigatorSkill;
  fightingBrawl: InvestigatorSkill;
  libraryUse: InvestigatorSkill;
  custom1: InvestigatorSkill;
  custom2: InvestigatorSkill;
  custom3: InvestigatorSkill;
  custom4: InvestigatorSkill;
  custom5: InvestigatorSkill;
  custom6: InvestigatorSkill;
  custom7: InvestigatorSkill;
  custom8: InvestigatorSkill;
  custom9: InvestigatorSkill;
  custom10: InvestigatorSkill;
  custom11: InvestigatorSkill;
  custom12: InvestigatorSkill;
  fireArms: InvestigatorSkill;
  fighting: InvestigatorSkill;
  appraise: InvestigatorSkill;
  listen: InvestigatorSkill;
  archaeology: InvestigatorSkill;
  lockSmith: InvestigatorSkill;
  sleightOfHand: InvestigatorSkill;
  artCraft: InvestigatorSkill;
  fireArmsHandgun: InvestigatorSkill;
  mechRepair: InvestigatorSkill;
  spotHidden: InvestigatorSkill;
  fireArmsRifleShotgun: InvestigatorSkill;
  medicine: InvestigatorSkill;
  stealth: InvestigatorSkill;
  naturalWorld: InvestigatorSkill;
  survival: InvestigatorSkill;
  charm: InvestigatorSkill;
  firstAid: InvestigatorSkill;
  navigate: InvestigatorSkill;
  swim: InvestigatorSkill;
  climb: InvestigatorSkill;
  history: InvestigatorSkill;
  occult: InvestigatorSkill;
  throw: InvestigatorSkill;
  creditRating: InvestigatorSkill;
  intimidate: InvestigatorSkill;
  opHvMachine: InvestigatorSkill;
  track: InvestigatorSkill;
  cthulhuMythos: InvestigatorSkill & {
    value: number;
  };
  jump: InvestigatorSkill;
  persuade: InvestigatorSkill;
  disguise: InvestigatorSkill;
  languageOther: InvestigatorSkill;
  pilot: InvestigatorSkill;
  dodge: InvestigatorSkill;
  psychology: InvestigatorSkill;
  driveAuto: InvestigatorSkill;
  psychoAnalysis: InvestigatorSkill;
  elecRepair: InvestigatorSkill;
  languageOwn: InvestigatorSkill;
  ride: InvestigatorSkill;
}

export interface Weapon {
  name?: string;
  value?: number;
  damage?: string;
  range?: number | "-";
  attacks?: number | "-";
  ammo?: number | "-";
  malf?: number | "-";
}

export interface BackStory {
  personalDescription?: string;
  traits?: string;
  ideology?: string;
  injuries?: string;
  significantPeople?: string;
  phobias?: string;
  locations?: string;
  spells?: string;
  possessions?: string;
  encounters?: string;
}

export interface CashAndAssets {
  spendingLevel?: number;
  cash?: number;
  assets: string[];
}

export interface FellowInvestigator {
  char?: string;
  player?: string;
}

export interface CharacterSheet extends DatabaseEntry {
  characterInfo: CharacterInfo;
  mainStats: MainStats;
  secondaryStats: SecondaryStats;
  investigatorSkills: InvestigatorSkills;
  weapons: Weapon[];
  backstory: BackStory;
  gear: string[];
  cashAndAssets: CashAndAssets;
  fellowInvestigators: FellowInvestigator[];
}
