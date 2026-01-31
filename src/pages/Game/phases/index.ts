import { endTurn } from "pages/Game/phases/endTurn";
import { playCard } from "pages/Game/phases/playCard";
import { playerTurn } from "pages/Game/phases/playerTurn";
import { restartGame } from "pages/Game/phases/restartGame";
import { startGame } from "pages/Game/phases/startGame";
import type { Phases, State } from "../../../utils/types/game";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const phases: Phases = (state, action): State => {
  switch (action.phase) {
    case "START_GAME":
      return startGame(state);
    case "PLAYER_TURN":
      return playerTurn(state);
    case "PLAY_CARD":
      return playCard(state, action);
    case "END_TURN":
      return endTurn(state);
    case "RESTART_GAME":
      return restartGame();
    default:
      return state;
  }
};
