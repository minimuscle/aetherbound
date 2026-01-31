import { CARD_LIBRARY } from "components/Cards/library";
import type { GameCardId } from "components/Cards/types";
import type { Player, State } from "utils/types/game";

export const EFFECTS = {
  stats: {
    modify: {
      run: (ctx: { state: State; owner: Player; gameCardId: GameCardId }, args: { stat: "damage" | "health"; amount: number }) => {
        const { state, owner, gameCardId } = ctx;
        const { stat, amount } = args;

        const sideKey = owner === "PLAYER" ? "player" : "enemy";
        const side = state[sideKey];

        const field = side.field.map((card) => {
          if (card.gameCardId !== gameCardId) return card;
          const defaultValue = CARD_LIBRARY[card.id]?.[stat] ?? 0;

          const current = card[stat] ?? defaultValue; // damage/health might be undefined
          return {
            ...card,
            [stat]: current + amount,
          };
        });

        return {
          ...state,
          [sideKey]: {
            ...side,
            field,
          },
        };
      },
    },
  },
} as const;
