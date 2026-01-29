import type { CardDefinition } from "./types";

export const CARD_LIBRARY: CardDefinition[] = [
  {
    id: 1,
    name: "Fire Imp",
    type: "CREATURE",
    cost: 1,
    description: "A small demon that likes trouble.",
    effect: "ATTACK",
    damage: 1,
    health: 1,
  },
  {
    id: 2,
    name: "Aether Bolt",
    type: "SPELL",
    cost: 1,
    description: "Deal 2 damage to the enemy.",
    effect: "ATTACK",
    damage: 2,
    target: "ALIVE",
  },
  {
    id: 3,
    name: "Stone Golem",
    type: "CREATURE",
    cost: 3,
    description: "A sturdy construct.",
    damage: 3,
    effect: "ATTACK",
    health: 10,
  },
];
