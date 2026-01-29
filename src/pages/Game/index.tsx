import { HeartIcon, ShieldStarIcon, SwordIcon } from "@phosphor-icons/react";
import { useEffect, useReducer, useRef } from "react";
import exampleAttunement from "../../assets/images/exampleAttunement.webp";
import { Button } from "../../components/Button";
import { Card } from "../../components/Cards";
import type { CardNames, Element } from "../../components/Cards/types";
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
    playerHealth: 100,
    playerAttunement: "FIRE" as unknown as Element,
    enemyHealth: 100,
    enemyDeck: shuffle(starterDeck),
    enemyHand: [],
    enemyField: [],
    mana: {
      FIRE: 0,
      WATER: 0,
      EARTH: 0,
      AIR: 0,
      LIGHT: 0,
      DARK: 0,
      LIFE: 0,
      DEATH: 0,
      AETHER: 0,
      VOID: 0,
    },
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") return;

      // gate conditions
      if (!state.gameStarted) return;
      if (state.activePlayer !== "PLAYER") return;
      if (state.nextPhase === "GAME_OVER") return;

      e.preventDefault(); // stop page scroll
      dispatch({ phase: "END_TURN" });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
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
          <div className="Game__board--enemy">
            <p>Enemy Health: {state.enemyHealth} / 100</p>
          </div>
          <div className="Game__board--player">
            <div className="Player__mana">
              {Object.entries(state.mana).map(([type, amount]) => (
                <p>
                  {type}: {amount}
                </p>
              ))}
              <div className="Player__cardsTally">{state.playerDeck.length} Cards</div>
            </div>
            <div className="Player__area">
              <div className="Player__field">
                {state.playerField.map((card) => (
                  <Card card={card} isActive key={card.gameCardId} />
                ))}
              </div>
              <div className="Player__main">
                <div className="Player__mainRunes" />
                <div className="Player__stats">
                  <div className="Player__statsShield">
                    <ShieldStarIcon weight="bold" size={64} />
                  </div>
                  <div className="Player__statsAttunement">
                    <div className="Player__statsHealth">
                      <HeartIcon weight="fill" size={32} />
                      {state.playerHealth} / 100
                    </div>
                    <img src={exampleAttunement} alt="" />
                    {state.activePlayer === "PLAYER" && state.gameStarted && state.nextPhase !== "GAME_OVER" && (
                      <Button onClick={() => dispatch({ phase: "END_TURN" })} className="Player__endTurn">
                        End Turn <span>(Space)</span>
                      </Button>
                    )}
                  </div>
                  <div className="Player__statsWeapon">
                    <SwordIcon weight="bold" size={64} />
                  </div>
                </div>
                <div className="Player__mainPermanents" />
              </div>
            </div>
            <div className="Player__cards">
              <div className="Player__cardsDeck">
                {state.playerHand.map((card, index) => (
                  <Card card={card} key={card.gameCardId} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*

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
