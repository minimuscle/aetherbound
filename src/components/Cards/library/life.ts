import type { CardDefinition, CardKey } from "../types";

export const LIFE_CARDS = {
  /***** RUNE - 1 *****/
  BASE_LIFE_PERMANENT_RUNE: {
    element: "LIFE",
    type: "RUNE",
    name: "Life Rune",
    description: "At the start of your turn, generate 1 Life.",
    cost: 0,
    effect: "GENERATE",
    mana: {
      amount: 1,
      element: "LIFE",
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
