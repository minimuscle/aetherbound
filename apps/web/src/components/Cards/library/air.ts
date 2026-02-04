import type { CardDefinition, CardKey } from "../types";

export const AIR_CARDS = {
  /***** RUNE - 1 *****/
  BASE_AIR_PERMANENT_RUNE: {
    element: "AIR",
    type: "RUNE",
    name: "Air Rune",
    description: "At the start of your turn, generate 1 Air.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "flux.generate", args: { element: "AIR", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_AIR_CREATURE_TOPAZ_ELEMENTAL: {
    element: "AIR",
    type: "CREATURE",
    name: "Topaz Elemental",
    description: "A storm sealed in golden crystal.",
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
