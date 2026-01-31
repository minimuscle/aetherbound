import type { CardDefinition, CardKey } from "../types";

export const FIRE_CARDS = {
  /***** RUNE - 1 *****/
  BASE_FIRE_PERMANENT_RUNE: {
    element: "FIRE",
    type: "RUNE",
    name: "Fire Rune",
    description: "At the start of your turn, generate 1 Fire.",
    cost: 0,
    price: 10,
    triggers: {
      onTurnEnd: [{ id: "mana.generate", args: { element: "FIRE", amount: 1 } }],
    },
  },

  /***** CREATURES - 6 *****/
  BASE_FIRE_CREATURE_RUBY_ELEMENTAL: {
    element: "FIRE",
    type: "CREATURE",
    name: "Ruby Elemental",
    description: "A living inferno bound in molten crystal.",
    cost: 10,
    price: 100,
    damage: 10,
    health: 6,
    triggers: {},
  },
  BASE_FIRE_CREATURE_EMBER: {
    element: "FIRE",
    type: "CREATURE",
    name: "Ember",
    description: "A wisp of flame",
    cost: 1,
    price: 50,
    damage: 1,
    health: 1,
    triggers: {
      onTurnEnd: [{ id: "stats.modify", args: { stat: "damage", amount: 1 } }],
    },
  },
  BASE_FIRE_CREATURE_PHOENIX: {
    element: "FIRE",
    type: "CREATURE",
    name: "Phoenix",
    description: "Can be reborn from the ash",
    cost: 7,
    price: 69,
    damage: 6,
    health: 1,
    triggers: {},
  },

  /***** SPELLS - 5 *****/

  /***** SHIELD - 1 *****/
  // BASE_FIRE_SHIELD_HEAT_SHIELD: {
  //   element: "FIRE",
  //   type: "SHIELD",
  //   name: "Heat Shield",
  //   description: "Reduces enemies attacks by 1",
  //   cost: 5,
  //   effect: "PROTECT",
  //   shield_effect: {
  //     type: "DAMAGE_REDUCTION",
  //     amount: 1,
  //   },
  // },

  /***** WEAPON - 1 *****/
  // BASE_FIRE_WEAPON_FLAMING_SWORD: {
  //   element: "FIRE",
  //   type: "WEAPON",
  //   name: "Flaming Sword",
  //   description: "Its a sword, on fire",
  //   cost: 6,
  //   effect: "ATTACK",
  //   damage: 3,
  // },
} as const satisfies Record<CardKey, CardDefinition>;
