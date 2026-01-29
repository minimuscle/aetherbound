import type { CardDefinition, CardKey } from "../types";

export const FIRE_CARDS = {
  /***** RUNE - 1 *****/
  BASE_FIRE_PERMANENT_RUNE: {
    element: "FIRE",
    type: "RUNE",
    name: "Fire Rune",
    description: "At the start of your turn, generate 1 Fire.",
    cost: 0,
    effect: "GENERATE",
    mana: {
      amount: 1,
      element: "FIRE",
    },
  },

  /***** CREATURES - 6 *****/
  BASE_FIRE_CREATURE_RED_DRAGON: {
    element: "FIRE",
    type: "CREATURE",
    name: "Red Dragon",
    description: "An ancient apex predator of living flame.",
    cost: 10,
    effect: "ATTACK",
    damage: 12,
    health: 10,
  },
  BASE_FIRE_CREATURE_EMBER: {
    element: "FIRE",
    type: "CREATURE",
    name: "Ember",
    description: "A wisp of flame",
    cost: 1,
    effect: "ATTACK",
    damage: 1,
    health: 1,
  },
  BASE_FIRE_CREATURE_PHOENIX: {
    element: "FIRE",
    type: "CREATURE",
    name: "Phoenix",
    description: "Can be reborn from the ash",
    cost: 7,
    effect: "ATTACK",
    damage: 6,
    health: 1,
  },

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/
  BASE_FIRE_SHIELD_HEAT_SHIELD: {
    element: "FIRE",
    type: "SHIELD",
    name: "Heat Shield",
    description: "Reduces enemies attacks by 1",
    cost: 5,
    effect: "PROTECT",
    shield_effect: {
      type: "DAMAGE_REDUCTION",
      amount: 1,
    },
  },

  /***** WEAPON - 1 *****/
  BASE_FIRE_WEAPON_FLAMING_SWORD: {
    element: "FIRE",
    type: "WEAPON",
    name: "Flaming Sword",
    description: "Its a sword, on fire",
    cost: 6,
    effect: "ATTACK",
    damage: 3,
  },
} as const satisfies Record<CardKey, CardDefinition>;
