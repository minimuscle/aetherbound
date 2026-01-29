import { createContext } from "react";
import type { Page } from "./types/game";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type GlobalContext = {
  playMusic: boolean;
  activePage: Page;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
};

/**********************************************************************************************************
 *   CONTEXT START
 **********************************************************************************************************/
export const GlobalContext = createContext<GlobalContext | null>(null);
