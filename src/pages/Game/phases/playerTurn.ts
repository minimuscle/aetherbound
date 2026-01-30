import { drawCard } from "pages/Game/utils/functions";
import type { State } from "utils/types/game";

export const playerTurn = (state: State): State => {
  const { deck: nextDeck, cards } = drawCard(state.player.deck);

  if (state.player.deck.length === 0) {
    return {
      ...state,
      nextPhase: "GAME_OVER",
    };
  }

  return {
    ...state,
    player: {
      ...state.player,
      deck: nextDeck,
      hand: [...state.player.hand, ...cards],
    },
    nextPhase: "END_TURN",
  };
};
