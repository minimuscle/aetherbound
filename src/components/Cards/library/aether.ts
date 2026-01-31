import type { CardDefinition, CardKey } from "../types";

export const AETHER_CARDS = {
  /***** RUNE - 1 *****/
  BASE_AETHER_PERMANENT_RUNE: {
    element: "AETHER",
    type: "RUNE",
    name: "Aether Rune",
    description: "At the start of your turn, generate 1 Aether.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "AETHER", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
