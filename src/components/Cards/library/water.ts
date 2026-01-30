import type { CardDefinition, CardKey } from "../types";

export const WATER_CARDS = {
  /***** RUNE - 1 *****/
  BASE_WATER_PERMANENT_RUNE: {
    element: "WATER",
    type: "RUNE",
    name: "Water Rune",
    description: "At the start of your turn, generate 1 Water.",
    cost: 0,
    effect: "GENERATE",
    mana: {
      amount: 1,
      element: "WATER",
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
