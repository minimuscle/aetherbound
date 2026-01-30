import type { CardDefinition, CardKey } from "../types";

export const LIGHT_CARDS = {
  /***** RUNE - 1 *****/
  BASE_LIGHT_PERMANENT_RUNE: {
    element: "LIGHT",
    type: "RUNE",
    name: "Light Rune",
    description: "At the start of your turn, generate 1 Light.",
    cost: 0,
    effect: "GENERATE",
    mana: {
      amount: 1,
      element: "LIGHT",
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
