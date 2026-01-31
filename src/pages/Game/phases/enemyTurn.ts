import { CARD_LIBRARY } from "components/Cards/library";
import type { Action, State } from "utils/types/game";

export const enemyTurn = (state: State, dispatch: React.Dispatch<Action>) => {
  state.enemy.hand.forEach((card) => {
    const cardData = CARD_LIBRARY[card.id];
    if (cardData.cost === 0 || cardData.cost < state.enemy.mana[cardData.element]) {
      dispatch({ phase: "PLAY_CARD", card: card.gameCardId });
    }
  });
  // dispatch({ phase: "END_TURN" });
  // return {
  //   ...state,
  //   activePlayer: "PLAYER",
  //   nextPhase: "TURN_START",
  // };
};
