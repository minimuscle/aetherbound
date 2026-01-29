import type { CardDefinition } from "./types";

export const CARD_LIBRARY = {
  BASE_FIRE_IMP: {
    name: "Fire Imp",
    type: "CREATURE",
    cost: 1,
    description: "A small demon that likes trouble.",
    effect: "ATTACK",
    damage: 1,
    health: 1,
  },
  BASE_AETHER_BOLT: {
    name: "Aether Bolt",
    type: "SPELL",
    cost: 1,
    description: "Deal 2 damage to the enemy.",
    effect: "ATTACK",
    damage: 2,
    target: "ALIVE",
  },
  BASE_STONE_GOLEM: {
    name: "Stone Golem",
    type: "CREATURE",
    cost: 3,
    description: "A sturdy construct.",
    damage: 3,
    effect: "ATTACK",
    health: 10,
  },
} as const satisfies Record<string, CardDefinition>;
