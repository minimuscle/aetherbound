import { FireSimpleIcon } from "@phosphor-icons/react";
import { use } from "react";
import { GameContext } from "../../pages/Game/utils/context";
import "./cards.scss";
import { CARD_LIBRARY } from "./library";
import { CardTooltip } from "./tooltip";
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
  const { dispatch } = use(GameContext)!;

  /***** RENDER *****/
  return (
    <CardTooltip card={card}>
      {isActive ? (
        <div className="Card--active">
          <p className="Card--active__name">{cardData.name}</p>
          {cardData.type === "CREATURE" && (
            <p className="Card--active__stats">
              {cardData.damage} / {cardData.health}
            </p>
          )}
        </div>
      ) : (
        <button onClick={() => dispatch({ phase: "PLAY_CARD", card: gameCardId })} className="Card">
          <p>{cardData.name}</p>
          <div className="Card__cost">
            {cardData.cost === 0 ? (
              ""
            ) : (
              <>
                <FireSimpleIcon weight="fill" /> {cardData.cost}
              </>
            )}
          </div>
        </button>
      )}
    </CardTooltip>
  );
};
