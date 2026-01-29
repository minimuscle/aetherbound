import { createContext } from "react";
import type { Player } from "../../../utils/types/game";
import type { Action } from "./phases";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type GameContext = {
  activePlayer: Player;
  dispatch: React.Dispatch<Action>;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const GameContext = createContext<GameContext | null>(null);
