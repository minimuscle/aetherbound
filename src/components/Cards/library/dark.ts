import type { CardDefinition, CardKey } from "../types";

export const DARK_CARDS = {
  /***** RUNE - 1 *****/
  BASE_DARK_PERMANENT_RUNE: {
    element: "DARK",
    type: "RUNE",
    name: "Dark Rune",
    description: "At the start of your turn, generate 1 Dark.",
    cost: 0,
    effect: "GENERATE",
    mana: {
      amount: 1,
      element: "DARK",
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
