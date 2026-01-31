import type { CardDefinition, CardKey } from "../types";

export const LIGHT_CARDS = {
  /***** RUNE - 1 *****/
  BASE_LIGHT_PERMANENT_RUNE: {
    element: "LIGHT",
    type: "RUNE",
    name: "Light Rune",
    description: "At the start of your turn, generate 1 Light.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "LIGHT", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_LIGHT_CREATURE_DIAMOND_ELEMENTAL: {
    element: "LIGHT",
    type: "CREATURE",
    name: "DIAMON Elemental",
    description: "A radiant prism of living light.",
    cost: 10,
    price: 100,
    damage: 10,
    health: 6,
    triggers: {},
  },

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/

  /***** WEAPON - 1 *****/
} as const satisfies Record<CardKey, CardDefinition>;
