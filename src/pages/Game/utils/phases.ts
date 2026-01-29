import { CARD_LIBRARY } from "../../../components/Cards/library";
import type { Element, GameCard, GameCardId } from "../../../components/Cards/types";
import type { Player } from "../../../utils/types/game";
import { drawOne, drawSix } from "./functions";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Phase = "START_GAME" | "END_TURN" | "PLAYER_TURN" | "ENEMY_TURN" | "TURN_START" | "PLAY_CARD" | "GAME_OVER";

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
  playerAttunement: Element;
  enemyDeck: GameCard[];
  enemyHand: GameCard[];
  enemyField: GameCard[];
  enemyHealth: number;
  mana: Record<Element, number>;
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
  const playerFieldDamage = state.playerField.reduce((acc, card) => acc + (CARD_LIBRARY[card.id]?.damage ?? 0), 0);
  const selectedCard = state.playerHand.find((card) => card.gameCardId === action.card)?.id;
  const cardData = selectedCard ? CARD_LIBRARY[selectedCard] : null;

  const addMana = (mana: State["mana"], element: Element, amount = 1) => {
    return { ...mana, [element]: (mana[element] ?? 0) + amount };
  };

  const mana = state.playerField.reduce(
    (mana, cardKey) => {
      const card = CARD_LIBRARY[cardKey.id];
      if (card.type !== "RUNE") return mana;

      return addMana(mana, card.mana.element, card.mana.amount); //{ ...mana, [card.mana.element]: mana[card.mana.element as keyof typeof mana] + card.mana.amount };
    },
    addMana(state.mana, state.playerAttunement),
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
      if (!cardData) return state;
      if (cardData?.cost > state.mana[cardData.element as keyof typeof state.mana]) {
        return state;
      }

      return {
        ...state,
        playerHand: state.playerHand.filter((card) => card.gameCardId !== action.card),
        playerField: [...state.playerField, state.playerHand.find((card) => card.gameCardId === action.card)],
        nextPhase: "END_TURN",
        mana: {
          ...state.mana,
          [cardData.element]: state.mana[cardData.element as keyof typeof state.mana] - cardData.cost,
        },
      };
    case "END_TURN":
      console.log(state.playerAttunement);
      return {
        ...state,
        activePlayer: "ENEMY",
        enemyHealth: state.enemyHealth - playerFieldDamage < 0 ? 0 : state.enemyHealth - playerFieldDamage,
        nextPhase: state.enemyHealth - playerFieldDamage <= 0 ? "GAME_OVER" : "TURN_START",
        mana,
      };
    case "ENEMY_TURN":
      return {
        ...state,
        activePlayer: "PLAYER",
        nextPhase: "TURN_START",
      };
  }
};
