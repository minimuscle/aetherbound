import { use } from "react";
import { GameContext } from "../../pages/Game/utils/context";
import { CARD_LIBRARY } from "./library";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardPermanents = () => {
  const {
    state: { playerField },
  } = use(GameContext)!;
  const runeCards = playerField.filter((card) => CARD_LIBRARY[card.id].type === "RUNE");

  return (
    <div className="Runes">
      <div className="Runes__rune" />
      <div className="Runes__rune" />
      <div className="Runes__rune" />
      <div className="Runes__rune" />
      <div className="Runes__rune" />
      <div className="Runes__rune" />
      <div className="Runes__rune" />
      <div className="Runes__rune" />
    </div>
  );
};
