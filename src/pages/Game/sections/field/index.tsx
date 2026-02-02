import { Card } from "components/Cards";
import { CARD_LIBRARY } from "components/Cards/library";
import type { GameCard } from "components/Cards/types";
import { GameContext } from "pages/Game/utils/context";
import { use } from "react";
import type { Player } from "utils/types/game";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type FieldSection = React.FC<{
  player: Player;
}>;

const FIELD_DISPLAY_ORDER = [4, 2, 0, 1, 3, 9, 7, 5, 6, 8];

const orderFieldCards = (cards: GameCard[]) => {
  if (cards.length <= 1) return cards;

  const ordered: GameCard[] = [];

  for (const index of FIELD_DISPLAY_ORDER) {
    if (index < cards.length) ordered.push(cards[index]);
  }

  if (cards.length > FIELD_DISPLAY_ORDER.length) {
    ordered.push(...cards.slice(FIELD_DISPLAY_ORDER.length));
  }

  return ordered;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const FieldSection: FieldSection = ({ player }) => {
  /***** HOOKS *****/
  const {
    state: {
      [player.toLowerCase() as "player" | "enemy"]: { field },
    },
  } = use(GameContext)!;

  const creatureCards = field.filter(({ id }) => CARD_LIBRARY[id].type === "CREATURE");
  const orderedCards = orderFieldCards(creatureCards);
  const className = player === "PLAYER" ? "Player__field" : "Enemy__field";

  /***** RENDER *****/
  return (
    <div className={className}>
      {orderedCards.map((card) => (
        <Card card={card} isActive key={card.gameCardId} player={player} />
      ))}
    </div>
  );
};
