import { FireSimpleIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import { GameContext } from "../../pages/Game/utils/context";
import "./cards.scss";
import { CARD_LIBRARY } from "./library";
import type { GameCard } from "./types";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Card = React.FC<{
  card: GameCard;
  isActive?: boolean;
  index?: number;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const Card: Card = ({ card, isActive, index }) => {
  const { gameCardId, id } = card;
  const cardData = CARD_LIBRARY[id];
  const {
    dispatch,
    state: { playerHand },
  } = use(GameContext)!;
  const [isVisible, setIsVisible] = useState(false);

  /***** RENDER *****/
  return isActive ? (
    <div className="Card--active">
      <p className="Card--active__name">{cardData.name}</p>
      {cardData.type === "CREATURE" && (
        <p className="Card--active__stats">
          {cardData.damage} / {cardData.health}
        </p>
      )}
    </div>
  ) : (
    <button
      onClick={() => dispatch({ phase: "PLAY_CARD", card: gameCardId })}
      className="Card"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      // style={{
      //   animationDelay: index
      //     ? `${(index * 2) / Math.max(1, playerHand.length)}s`
      //     : "0s",
      // }}
    >
      <p>{cardData.name}</p>
      <div className="Card__cost">
        <FireSimpleIcon weight="fill" /> {cardData.cost}
      </div>
    </button>
  );
};
