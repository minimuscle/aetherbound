import { useEffect, useReducer, useRef } from "react";
import type { CardId } from "../../components/Cards/types";
import { CoinToss } from "./coin";
import "./game.scss";
import { GameContext } from "./utils/context";
import { generateRandomPlayer, shuffle } from "./utils/functions";
import { phases } from "./utils/phases";

const starterDeck: CardId[] = [
  "FIRE_IMP",
  "FIRE_IMP",
  "FIRE_IMP",
  "FIRE_IMP",
  "FIRE_IMP",
  "AETHER_BOLT",
  "STONE_GOLEM",
];

export const GamePage = () => {
  /***** HOOKS *****/
  const [state, dispatch] = useReducer(phases, {
    activePlayer: generateRandomPlayer(),
    gameStarted: false,
    showCoinToss: true,
    playerDeck: shuffle(starterDeck),
    playerHand: [],
    playerField: [],
    turn: 0,
    nextPhase: "START_GAME",
  });
  const phaseKeyRef = useRef("");

  useEffect(() => {
    if (!state.gameStarted) return;
    if (state.nextPhase !== "TURN_START") return;

    const key = `${state.turn}-${state.activePlayer}`;
    if (phaseKeyRef.current === key) return;
    phaseKeyRef.current = key;

    if (state.activePlayer === "PLAYER") {
      console.log("Starting turn for player: ", state.activePlayer);
      console.log("Drawing Card");
      dispatch({ phase: "PLAYER_TURN" });
    }

    if (state.activePlayer === "ENEMY") {
      console.log("Starting Enemy Turn");
      setTimeout(() => {
        console.log("turn finished");
        dispatch({ phase: "ENEMY_TURN" });
      }, 1000);
    }
  }, [state.nextPhase, state.activePlayer, state.gameStarted]);

  /***** RENDER *****/
  return (
    <GameContext value={{ activePlayer: state.activePlayer }}>
      <div className="Game">
        {state.showCoinToss && (
          <CoinToss startGame={() => dispatch({ phase: "START_GAME" })} />
        )}
        <p>Current Player: {state.activePlayer}</p>

        {state.activePlayer === "PLAYER" && (
          <button onClick={() => dispatch({ phase: "END_TURN" })}>
            End Turn
          </button>
        )}

        <p>Active Cards: {state.playerField?.map((card) => card).join(", ")}</p>
        <p>Cards in Hand: </p>
        {state.playerHand.map((card) => (
          <button onClick={() => dispatch({ phase: "PLAY_CARD", card })}>
            {card}
          </button>
        ))}
        <p>Deck Remaining: {state.playerDeck.length}</p>
      </div>
    </GameContext>
  );
};
