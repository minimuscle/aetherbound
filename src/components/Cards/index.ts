import type { CardDefinition, CardId } from "./types";

export const CARD_LIBRARY: Record<CardId, CardDefinition> = {
  FIRE_IMP: {
    id: "FIRE_IMP",
    name: "Fire Imp",
    type: "CREATURE",
    cost: 1,
    rulesText: "A small demon that likes trouble.",
    effect: "ATTACK",
    damage: 1,
    health: 1,
  },
  AETHER_BOLT: {
    id: "AETHER_BOLT",
    name: "Aether Bolt",
    type: "SPELL",
    cost: 1,
    rulesText: "Deal 2 damage to the enemy.",
    effect: "ATTACK",
    damage: 2,
    target: "ALL",
  },
  STONE_GOLEM: {
    id: "STONE_GOLEM",
    name: "Stone Golem",
    type: "CREATURE",
    cost: 3,
    rulesText: "A sturdy construct.",
    damage: 3,
    effect: "ATTACK",
    health: 10,
  },
};
