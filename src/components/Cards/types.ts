import type { Tagged } from "type-fest";
import type { CARD_LIBRARY } from "./library";

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
export type Element = "FIRE" | "EARTH" | "WATER" | "AIR" | "LIGHT" | "DARK";
export type Expansion = "BASE";
export type CardKey = `${Expansion}_${Element}_${CardType}_${string}`;
