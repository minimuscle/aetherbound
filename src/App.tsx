import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { extend } from "@pixi/react";
import { Container, Text } from "pixi.js";
import { useState } from "react";
import "./App.scss";
import { GamePage } from "./pages/Game";
import { MainPage } from "./pages/main";
import { GlobalContext } from "./utils/context";
import type { Page } from "./utils/types/game";

extend({ Container, Text });

export const App = () => {
  /***** HOOKS *****/
  const [activePage, setActivePage] = useState<Page>("MAIN");
  const [playMusic, setPlay] = useState(true);

  /***** RENDER HELPERS *****/
  const RenderPage: Record<Page, React.ReactNode> = {
    MAIN: <MainPage />,
    GAME: <GamePage />,
  };

  /***** RENDER *****/
  return (
    <GlobalContext value={{ playMusic, activePage, setActivePage }}>
      <div className="MainContainer">
        <button
          className="MainContainer__audio"
          onClick={() => setPlay(!playMusic)}
        >
          {playMusic ? (
            <SpeakerHighIcon size={32} />
          ) : (
            <SpeakerSlashIcon size={32} />
          )}
        </button>
        {RenderPage[activePage]}
      </div>
    </GlobalContext>
  );
};
