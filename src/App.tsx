import { extend } from "@pixi/react";
import { Container, Text } from "pixi.js";
import { useState } from "react";
import styles from "./App.module.css";
import { GamePage } from "./pages/Game";
import type { Page } from "./utils/types/game";

extend({ Container, Text });

export const App = () => {
  /***** HOOKS *****/
  const [activePage, setActivePage] = useState<Page>("GAME");

  /***** RENDER *****/
  return (
    <div className={styles.container}>
      <h1>Aetherbound</h1>
      {activePage === "MAIN" && (
        <button type="button" onClick={() => setActivePage("GAME")}>
          Start Game
        </button>
      )}
      {activePage === "GAME" && <GamePage />}
    </div>
  );
};
