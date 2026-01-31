import type { CardDefinition, CardKey } from "../types";

export const VOID_CARDS = {
  /***** RUNE - 1 *****/
  BASE_VOID_PERMANENT_RUNE: {
    element: "VOID",
    type: "RUNE",
    name: "Void Rune",
    description: "At the start of your turn, generate 1 Void.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "VOID", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
