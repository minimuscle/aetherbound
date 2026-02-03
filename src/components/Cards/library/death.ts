import type { CardDefinition, CardKey } from "../types";

export const DEATH_CARDS = {
  /***** RUNE - 1 *****/
  BASE_DEATH_PERMANENT_RUNE: {
    element: "DEATH",
    type: "RUNE",
    name: "Death Rune",
    description: "At the start of your turn, generate 1 Death.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "flux.generate", args: { element: "DEATH", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_DEATH_CREATURE_AMETHYST_ELEMENTAL: {
    element: "DEATH",
    type: "CREATURE",
    name: "Amethyst Elemental",
    description: "Cold crystal steeped in decay.",
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
