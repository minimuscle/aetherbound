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
      onTurnEnd: [{ id: "flux.generate", args: { element: "EARTH", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_EARTH_CREATURE_EMERALD_ELEMENTAL: {
    element: "EARTH",
    type: "CREATURE",
    name: "Emerald Elemental",
    description: "Ancient stone hardened by emerald veins.",
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
