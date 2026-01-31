import type { CardDefinition, CardKey } from "../types";

export const DARK_CARDS = {
  /***** RUNE - 1 *****/
  BASE_DARK_PERMANENT_RUNE: {
    element: "DARK",
    type: "RUNE",
    name: "Dark Rune",
    description: "At the start of your turn, generate 1 Dark.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "DARK", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_DARK_CREATURE_ONYX_ELEMENTAL: {
    element: "DARK",
    type: "CREATURE",
    name: "Onyx Elemental",
    description: "A faceted shadow that devours light.",
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
