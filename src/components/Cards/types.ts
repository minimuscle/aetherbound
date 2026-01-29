import type { Tagged } from "type-fest";

export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD";
export type CardId = Tagged<"CardId", number>;
export type GameCardId = Tagged<"GameCardId", number>;

export type CardDefinition = {
  id: CardId;
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
  id: CardId;
  gameCardId: GameCardId;
};
