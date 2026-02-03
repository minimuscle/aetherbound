import type { Element } from "components/Cards/types";
import type { Player, State } from "utils/types/game";

export const generate = {
  run: (ctx: { state: State; owner: Player }, args: { element: Element; amount: number }): State => {
    const { state, owner } = ctx;
    const { element, amount } = args;

    const sideKey = owner === "PLAYER" ? "player" : "enemy";
    const side = state[sideKey];

    return {
      ...state,
      [sideKey]: {
        ...side,
        flux: {
          ...side.flux,
          [element]: side.flux[element] + amount,
        },
      },
    };
  },
};
