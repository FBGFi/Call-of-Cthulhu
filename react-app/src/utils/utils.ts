import { CharacterSheet } from "../store/utils/types";

export const formatNumberToLength = (
  number: number,
  length: number,
): string => {
  let addZeroes = number.toString();
  for (let i = length; i > addZeroes.length; i--) {
    addZeroes = "0" + addZeroes;
  }
  return addZeroes;
};

export const getNumArray = (length: number): number[] =>
  [...new Array(length)].map((_, i) => i);

export const exportCharacterToFile = (characterSheet: CharacterSheet) => {
  const blob = new Blob([JSON.stringify(characterSheet)], {
    type: "text/json",
  });
  const link = document.createElement("a");

  link.download = `${characterSheet.characterInfo.characterName}.json`;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();
};
