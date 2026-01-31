import { HeartIcon, SwordIcon } from "@phosphor-icons/react";
import { CardShield } from "components/Cards/variantDesigns/shield";
import { useEffect, useReducer, useRef } from "react";
import exampleAttunement from "../../assets/images/exampleAttunement.webp";
import { Button } from "../../components/Button";
import { Card } from "../../components/Cards";
import { CARD_LIBRARY } from "../../components/Cards/library";
import type { CardNames, Element } from "../../components/Cards/types";
import { CardPermanents } from "../../components/Cards/variantDesigns/permanents";
import { CardRunes } from "../../components/Cards/variantDesigns/runes";
import { CoinToss } from "./components/coin";
import "./game.scss";
import { phases } from "./phases";
import { ManaSection } from "./sections/mana";
import { cardDraw } from "./utils/audio";
import { GameContext } from "./utils/context";
import { generateRandomPlayer, shuffle } from "./utils/functions";

const starterDeck: CardNames[] = [
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  "BASE_FIRE_CREATURE_EMBER",
  // "BASE_FIRE_CREATURE_RED_DRAGON",
  // "BASE_FIRE_CREATURE_RED_DRAGON",
  // "BASE_FIRE_CREATURE_RED_DRAGON",
  // "BASE_FIRE_CREATURE_RED_DRAGON",
  // "BASE_FIRE_CREATURE_RED_DRAGON",
  // "BASE_FIRE_CREATURE_RED_DRAGON",
  // "BASE_FIRE_PERMANENT_RUNE",

  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  "BASE_FIRE_PERMANENT_RUNE",
  // "BASE_FIRE_SHIELD_HEAT_SHIELD",
  // "BASE_FIRE_SHIELD_HEAT_SHIELD",
  // "BASE_FIRE_SHIELD_HEAT_SHIELD",
  // "BASE_FIRE_SHIELD_HEAT_SHIELD",
  // "BASE_FIRE_WEAPON_FLAMING_SWORD",
  // "BASE_FIRE_CREATURE_PHOENIX",
  // "BASE_FIRE_CREATURE_PHOENIX",
  // "BASE_FIRE_CREATURE_PHOENIX",
  // "BASE_FIRE_CREATURE_PHOENIX",
  // "BASE_FIRE_CREATURE_PHOENIX",
  // "BASE_FIRE_CREATURE_PHOENIX",
];

export const GamePage = () => {
  /***** HOOKS *****/
  const [state, dispatch] = useReducer(phases, {
    activePlayer: generateRandomPlayer(),
    gameStarted: false,
    showCoinToss: true,
    player: {
      deck: shuffle(starterDeck),
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE" as unknown as Element,
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
    },
    enemy: {
      deck: shuffle(starterDeck),
      hand: [],
      field: [],
      health: 100,
      healthMax: 100,
      attunement: "FIRE" as unknown as Element,
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
    },

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
      dispatch({ phase: "PLAYER_TURN" });
      cardDraw.play();
    }

    if (state.activePlayer === "ENEMY") {
      setTimeout(() => {
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
            <div className="Enemy__cards">
              {state.enemy.hand.map((card, index) => (
                <Card card={card} key={card.gameCardId} index={index} player="ENEMY" />
              ))}
            </div>

            <p>Enemy Health: {state.enemy.health} / 100</p>
            <div className="Player__mana">
              <ManaSection player="ENEMY" />
            </div>
          </div>
          <div className="Game__board--player">
            <div className="Player__mana">
              <ManaSection player="PLAYER" />
            </div>
            <div className="Player__area">
              <div className="Player__field">
                {state.player.field
                  .filter(({ id }) => CARD_LIBRARY[id].type === "CREATURE")
                  .map((card) => (
                    <Card card={card} isActive key={card.gameCardId} />
                  ))}
              </div>
              <div className="Player__main">
                <div className="Player__mainRunes">
                  <CardRunes player="PLAYER" />
                </div>
                <div className="Player__stats">
                  <CardShield player="PLAYER" />

                  <div className="Player__statsAttunement">
                    <div className="Player__statsHealth">
                      <HeartIcon weight="fill" size={32} />
                      {state.player.health} / 100
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
                <div className="Player__mainPermanents">
                  <CardPermanents player="PLAYER" />
                  <div className="Player__cardsTally">{state.player.deck.length} Cards</div>
                </div>
              </div>
            </div>
            <div className="Player__cards">
              {state.player.hand.map((card, index) => (
                <Card card={card} key={card.gameCardId} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </GameContext>
  );
};
