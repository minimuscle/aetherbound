import type { CardDefinition, CardKey } from "../types";

export const LIFE_CARDS = {
  /***** RUNE - 1 *****/
  BASE_LIFE_PERMANENT_RUNE: {
    element: "LIFE",
    type: "RUNE",
    name: "Life Rune",
    description: "At the start of your turn, generate 1 Life.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "flux.generate", args: { element: "LIFE", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_LIFE_CREATURE_JADE_ELEMENTAL: {
    element: "LIFE",
    type: "CREATURE",
    name: "Jade Elemental",
    description: "Verdant crystal pulsing with renewal.",
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
