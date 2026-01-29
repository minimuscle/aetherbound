import type { Tagged } from "type-fest";
import type { CARD_LIBRARY } from ".";

export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD";
export type GameCardId = Tagged<"GameCardId", number>;

export type CardDefinition = {
  name: string;
  cost: number;
  description: string;
  effect: "ATTACK";
  damage: number;
} & (
  | {
      type: "CREATURE";
      health: number;
    }
  | { type: "SPELL"; target: "CREATURE" | "PLAYER" | "ALIVE" | "PERMANENT" }
);

export type GameCard = {
  id: CardNames;
  gameCardId: GameCardId;
};

export type CardNames = keyof typeof CARD_LIBRARY;
