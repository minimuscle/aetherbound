import type { CardDefinition, CardKey } from "../types";

export const WATER_CARDS = {
  /***** RUNE - 1 *****/
  BASE_WATER_PERMANENT_RUNE: {
    element: "WATER",
    type: "RUNE",
    name: "Water Rune",
    description: "At the start of your turn, generate 1 Water.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "WATER", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_WATER_CREATURE_SAPPHIRE_ELEMENTAL: {
    element: "WATER",
    type: "CREATURE",
    name: "Sapphire Elemental",
    description: "Flowing crystal that crashes like the tide.",
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
