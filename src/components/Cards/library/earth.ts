import type { CardDefinition, CardKey } from "../types";

export const EARTH_CARDS = {
  /***** RUNE - 1 *****/
  BASE_EARTH_PERMANENT_RUNE: {
    element: "EARTH",
    type: "RUNE",
    name: "Earth Rune",
    description: "At the start of your turn, generate 1 Earth.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "EARTH", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
