import { CARD_LIBRARY } from "../../../components/Cards/library";
import type { GameCard, GameCardId } from "../../../components/Cards/types";
import type { Player } from "../../../utils/types/game";
import { drawOne, drawSix } from "./functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Phase =
  | "START_GAME"
  | "END_TURN"
  | "PLAYER_TURN"
  | "ENEMY_TURN"
  | "TURN_START"
  | "PLAY_CARD"
  | "GAME_OVER";

export type State = {
  gameStarted: boolean;
  showCoinToss: boolean;
  nextPhase: Phase;
  turn: number;
  activePlayer: Player;
  playerDeck: GameCard[];
  playerHand: GameCard[];
  playerField: GameCard[];
  playerHealth: number;
  enemyDeck: GameCard[];
  enemyHand: GameCard[];
  enemyField: GameCard[];
  enemyHealth: number;
};

export type Action = {
  phase: Exclude<Phase, ["TURN_START", "GAME_OVER"]>;
  card?: GameCardId;
};

type Phases = (state: State, action: Action) => State;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const phases: Phases = (state, action) => {
  const { deck: startingDeck, cards } = drawSix(state.playerDeck);
  const { deck: nextDeck, card } = drawOne(state.playerDeck);
  const playerFieldDamage = state.playerField.reduce(
    (acc, card) => acc + (CARD_LIBRARY[card.id]?.damage ?? 0),
    0,
  );

  switch (action.phase) {
    case "START_GAME":
      return {
        ...state,
        gameStarted: true,
        showCoinToss: false,
        nextPhase: "TURN_START",
        playerDeck: startingDeck,
        playerHand: cards,
      };
    case "PLAYER_TURN":
      if (state.playerDeck.length === 0) {
        return {
          ...state,
          nextPhase: "GAME_OVER",
        };
      }

      return {
        ...state,
        playerDeck: nextDeck,
        playerHand: [...state.playerHand, card],
        nextPhase: "END_TURN",
      };

    case "PLAY_CARD":
      return {
        ...state,
        playerHand: state.playerHand.filter(
          (card) => card.gameCardId !== action.card,
        ),
        playerField: [
          ...state.playerField,
          state.playerHand.find((card) => card.gameCardId === action.card),
        ],
        nextPhase: "END_TURN",
      };
    case "END_TURN":
      return {
        ...state,
        activePlayer: "ENEMY",
        enemyHealth:
          state.enemyHealth - playerFieldDamage < 0
            ? 0
            : state.enemyHealth - playerFieldDamage,
        nextPhase:
          state.enemyHealth - playerFieldDamage <= 0
            ? "GAME_OVER"
            : "TURN_START",
      };
    case "ENEMY_TURN":
      return {
        ...state,
        activePlayer: "PLAYER",
        nextPhase: "TURN_START",
      };
  }
};
