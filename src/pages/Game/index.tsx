import { useEffect, useReducer, useRef } from "react";
import type { CardNames } from "../../components/Cards/types";
import { CoinToss } from "./coin";
import "./game.scss";
import { cardDraw } from "./utils/audio";
import { GameContext } from "./utils/context";
import { generateRandomPlayer, shuffle } from "./utils/functions";
import { phases } from "./utils/phases";

const starterDeck: CardNames[] = [
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_RED_DRAGON",
  "BASE_FIRE_CREATURE_RED_DRAGON",
  "BASE_FIRE_CREATURE_RED_DRAGON",
  "BASE_FIRE_CREATURE_RED_DRAGON",
  "BASE_FIRE_CREATURE_RED_DRAGON",
  "BASE_FIRE_CREATURE_RED_DRAGON",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_SHIELD_HEAT_SHIELD",
  "BASE_FIRE_WEAPON_FLAMING_SWORD",
  "BASE_FIRE_CREATURE_PHOENIX",
  "BASE_FIRE_CREATURE_PHOENIX",
  "BASE_FIRE_CREATURE_PHOENIX",
  "BASE_FIRE_CREATURE_PHOENIX",
  "BASE_FIRE_CREATURE_PHOENIX",
  "BASE_FIRE_CREATURE_PHOENIX",
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
    playerHealth: 50,
    enemyHealth: 50,
    enemyDeck: shuffle(starterDeck),
    enemyHand: [],
    enemyField: [],
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
      cardDraw.play();
    }

    if (state.activePlayer === "ENEMY") {
      console.log("Starting Enemy Turn");
      setTimeout(() => {
        console.log("turn finished");
        dispatch({ phase: "ENEMY_TURN" });
      }, 1000);
    }
  }, [state.nextPhase, state.activePlayer, state.gameStarted, state.turn]);

  useEffect(() => {
    if (state.nextPhase === "GAME_OVER") {
      console.log("Game Over", state);
    }
  }, [state]);

  /***** RENDER *****/
  return (
    <GameContext value={{ state, dispatch }}>
      <div className="Game">
        {state.showCoinToss && (
          <CoinToss
            startGame={() => {
              dispatch({ phase: "START_GAME" });
            }}
          />
        )}

        <div className="Game__board">
          <div className="Game__board--enemy" />
          <div className="Game__board--player">
            <div className="Player__mana">
              <div className="Player__cardsTally" />
            </div>
            <div className="Player__area">
              <div className="Player__field" />
              <div className="Player__stats">
                <div className="Player__statsRunes" />
                <div>
                  <div className="Player__statsShield" />
                  <div className="Player__statsAttunement" />
                  <div className="Plauer__statsWeapon" />
                </div>
                <div className="Player__statsPermanents" />
              </div>
            </div>
            <div className="Player__cards">
              <div className="Player__cardsDeck"></div>
            </div>
          </div>
        </div>

        {/* <p>Current Player: {state.activePlayer}</p>
        <p>Player Health: {state.playerHealth}</p>
        <p>Enemy Health: {state.enemyHealth}</p>

        {state.activePlayer === "PLAYER" && (
          <button onClick={() => dispatch({ phase: "END_TURN" })}>
            End Turn
          </button>
        )}

        <p>
          Active Cards:{" "}
          {state.playerField.map((card) => (
            <Card card={card} isActive key={card.gameCardId} />
          ))}
        </p>
        <p>Cards in Hand: </p>
        {state.playerHand.map((card, index) => (
          <Card card={card} key={card.gameCardId} index={index} />
        ))}
        <p>Deck Remaining: {state.playerDeck.length}</p> */}
      </div>
    </GameContext>
  );
};
