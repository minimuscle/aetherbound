import { useEffect, useState } from "react";
import type { CardId } from "../../components/Cards/types";
import type { Player } from "../../utils/types/game";
import { CoinToss } from "./coin";
import "./game.scss";
import { GameContext } from "./utils/context";
import { drawOne, shuffle } from "./utils/functions";

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
  const [activePlayer, setActivePlayer] = useState<Player>(() =>
    Math.random() < 0.5 ? "PLAYER" : "ENEMY",
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [showCoinToss, setShowCoinToss] = useState(true);

  const [playerDeck, setPlayerDeck] = useState<CardId[]>(() =>
    shuffle(starterDeck),
  );
  const [playerHand, setPlayerHand] = useState<CardId[]>([]);

  const isPlayerTurn = activePlayer === "PLAYER";

  const endTurn = () => {
    setActivePlayer((prev) => (prev === "PLAYER" ? "ENEMY" : "PLAYER"));
  };

  const startGame = () => {
    setShowCoinToss(false);
    setGameStarted(true);
    console.log(`Game Started, player ${activePlayer} going first.`);
  };

  const drawAtTurnStart = () => {
    setPlayerDeck((currentDeck) => {
      const { deck: nextDeck, card } = drawOne(currentDeck);
      if (card) {
        setPlayerHand((hand) => [...hand, card]);
        console.log(`Turn: PLAYER drew ${card}`);
      } else {
        console.log(`Turn: PLAYER tried to draw but deck was empty`);
      }
      return nextDeck;
    });
  };

  /***** EFFECTS *****/
  useEffect(() => {
    const t = setTimeout(() => {
      if (!gameStarted) return;

      if (activePlayer === "ENEMY") {
        console.log("Enemys Turn");
        endTurn();
        drawAtTurnStart();
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [activePlayer, gameStarted]);

  /***** RENDER *****/
  return (
    <GameContext value={{ activePlayer }}>
      <div className="Game">
        {showCoinToss && <CoinToss startGame={startGame} />}
        <p>Current Player: {activePlayer}</p>

        {isPlayerTurn && <button onClick={endTurn}>End Turn</button>}

        <p>Active Cards: </p>
        <p>Cards in Hand: {playerHand.length}</p>
        <p>Deck Remaining: {playerDeck.length}</p>
      </div>
    </GameContext>
  );
};
