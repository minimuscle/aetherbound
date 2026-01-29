import type { CardId } from "../../../components/Cards/types";
import type { Player } from "../../../utils/types/game";
import { drawOne } from "./functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Phase =
  | "START_GAME"
  | "END_TURN"
  | "PLAYER_TURN"
  | "ENEMY_TURN"
  | "TURN_START"
  | "PLAY_CARD";

type State = {
  gameStarted: boolean;
  showCoinToss: boolean;
  nextPhase: Phase;
  turn: number;
  activePlayer: Player;
  playerDeck: CardId[];
  playerHand: CardId[];
  playerField: CardId[];
};

type Action = {
  phase: Exclude<Phase, "TURN_START">;
  card?: CardId;
};

type Phases = (state: State, action: Action) => State;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const phases: Phases = (state, action) => {
  switch (action.phase) {
    case "START_GAME":
      console.log(`Game Started, player ${state.activePlayer} going first.`);
      return {
        ...state,
        gameStarted: true,
        showCoinToss: false,
        nextPhase: "TURN_START",
      };
    case "PLAYER_TURN":
      const { deck: nextDeck, card } = drawOne(state.playerDeck);

      return {
        ...state,
        playerDeck: nextDeck,
        playerHand: [...state.playerHand, card],
        nextPhase: "END_TURN",
      };

    case "PLAY_CARD":
      return {
        ...state,
        playerHand: state.playerHand.filter((card) => card !== action.card),
        playerField: [...state.playerField, action.card],
        nextPhase: "END_TURN",
      };
    case "END_TURN":
      console.log("Ending turn for player: ", state.activePlayer);
      return {
        ...state,
        activePlayer: "ENEMY",
        nextPhase: "TURN_START",
      };
    case "ENEMY_TURN":
      return {
        ...state,
        activePlayer: "PLAYER",
        nextPhase: "TURN_START",
      };
  }
};
