import type { Tagged } from "type-fest";
import type { CARD_LIBRARY } from "./library";

export type CardType = "CREATURE" | "SPELL" | "PERMANENT" | "WEAPON" | "SHIELD" | "RUNE";
type CardEffects = "ATTACK" | "GENERATE" | "PROTECT";
export type GameCardId = Tagged<"GameCardId", number>;

export type CardDefinition = {
  name: string;
  cost: number;
  description: string;
  effect: CardEffects;
  element: Element;
} & (
  | {
      type: "CREATURE";
      health: number;
      damage: number;
    }
  | {
      type: "SPELL";
      target: "CREATURE" | "PLAYER" | "ALIVE" | "PERMANENT";
      damage: number;
    }
  | {
      type: "RUNE";
      mana: {
        amount: number;
        element: Element;
      };
    }
  | {
      type: "WEAPON";
      damage: number;
    }
  | {
      type: "SHIELD";
      shield_effect: {
        type: "DAMAGE_REDUCTION";
        amount: number;
      };
    }
);

export type GameCard = {
  id: CardNames;
  gameCardId: GameCardId;
};

export type CardNames = keyof typeof CARD_LIBRARY;
export const ELEMENTS = ["FIRE", "EARTH", "WATER", "AIR", "LIGHT", "DARK", "LIFE", "DEATH", "AETHER", "VOID"] as const;
export type Element = (typeof ELEMENTS)[number];
export type Expansion = "BASE";
export type CardKey = `${Expansion}_${Element}_${CardType}_${string}`;
