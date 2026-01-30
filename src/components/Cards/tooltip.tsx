import { Tooltip } from "@mui/material";
import { CARD_LIBRARY } from "./library";
import type { GameCard } from "./types";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CardTooltip = React.FC<{ children: React.ReactElement; card: GameCard }>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardTooltip: CardTooltip = ({ children, card }) => {
  const cardData = CARD_LIBRARY[card.id];

  /***** RENDER *****/
  return (
    <Tooltip
      placement="top-start"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [-225, 0],
              },
            },
          ],
        },
        tooltip: {
          className: "CardTooltip",
        },
      }}
      title={
        <>
          <p>{cardData.name}</p>
          <p>Cost: {cardData.cost === 0 ? "FREE" : `${cardData.cost} ${cardData.element}`}</p>
          <br />
          {cardData.type === "CREATURE" && <p>Damage: {cardData.damage}</p>}
          {cardData.type === "CREATURE" && <p>Health: {cardData.health}</p>}
          {cardData.type === "RUNE" && (
            <p>
              Generates: {cardData.mana.amount} {cardData.mana.element}
            </p>
          )}
        </>
      }
    >
      {children}
    </Tooltip>
  );
};
