import classNames from "classnames";
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
  return (
    <div
      className="Card__wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div
          className={classNames("Card__modal", {
            "Card__modal--active": isActive,
          })}
        >
          <h2>{cardData.name}</h2>
          <p>{cardData.description}</p>
          <p>Damage: {cardData.damage}</p>
          {cardData.type === "CREATURE" && <p>Health: {cardData.health}</p>}
          <p>Cost: {cardData.cost}</p>
          {cardData.type === "SPELL" && <p>Target: {cardData.target}</p>}
        </div>
      )}
      {isActive ? (
        <div className="Card--active">{CARD_LIBRARY[id].name}</div>
      ) : (
        <button
          onClick={() => dispatch({ phase: "PLAY_CARD", card: gameCardId })}
          className="Card"
          style={{
            animationDelay: index
              ? `${(index * 2) / Math.max(1, playerHand.length)}s`
              : "0s",
          }}
        >
          {CARD_LIBRARY[id].name}
        </button>
      )}
    </div>
  );
};
