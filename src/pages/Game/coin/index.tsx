import { CrownSimpleIcon, XIcon } from "@phosphor-icons/react";
import classNames from "classnames";
import React, { use } from "react";
import { GameContext } from "../utils/context";
import "./coin.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CoinToss = React.FC<{
  startGame: () => void;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CoinToss: CoinToss = ({ startGame }) => {
  /***** HOOKS *****/
  const { activePlayer } = use(GameContext)!;

  /***** RENDER *****/
  return (
    <div className="coinTossWrapper">
      <div className="coinToss">
        <div
          className={classNames("coinToss--heads", {
            "coinToss--heads--selected": activePlayer === "PLAYER",
            "coinToss--heads--notSelected": activePlayer === "ENEMY",
          })}
        >
          <CrownSimpleIcon size={64} />
        </div>
        <div
          className={classNames("coinToss--tails", {
            "coinToss--heads--selected": activePlayer === "ENEMY",
            "coinToss--heads--notSelected": activePlayer === "PLAYER",
          })}
        >
          <XIcon size={64} />
        </div>
      </div>
      <h1 className="coinTossText">Winner: {activePlayer}</h1>
      <button onClick={startGame} className="coinTossClose">
        Start
      </button>
    </div>
  );
};
