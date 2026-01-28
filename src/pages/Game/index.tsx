import { useEffect, useState } from "react";
import type { Player } from "../../utils/types/game";
import { CoinToss } from "./coin";
import "./game.scss";
import { GameContext } from "./utils/context";

export const GamePage = () => {
  /***** HOOKS *****/
  const [activePlayer, setActivePlayer] = useState<Player>(() =>
    Math.random() < 0.5 ? "PLAYER" : "ENEMY",
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [showCoinToss, setShowCoinToss] = useState(true);

  const endTurn = () => {
    setActivePlayer((prev) => (prev === "PLAYER" ? "ENEMY" : "PLAYER"));
  };

  const startGame = () => {
    setShowCoinToss(false);
    setGameStarted(true);
    console.log(`Game Started, player ${activePlayer} going first.`);
  };

  /***** EFFECTS *****/
  useEffect(() => {
    if (activePlayer === "ENEMY") {
      console.log("Enemys Turn");
      endTurn();
    }
  }, [activePlayer]);

  /***** RENDER *****/
  return (
    <GameContext value={{ activePlayer }}>
      <div className="Game">
        {showCoinToss && <CoinToss startGame={startGame} />}
        <p>Current Player: {activePlayer}</p>

        <button onClick={endTurn}>End Turn</button>
      </div>
    </GameContext>
  );
};
