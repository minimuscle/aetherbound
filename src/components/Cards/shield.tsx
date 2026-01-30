import { ShieldStarIcon } from "@phosphor-icons/react";
import { use } from "react";
import { GameContext } from "../../pages/Game/utils/context";
import { CARD_LIBRARY } from "./library";
import { CardTooltip } from "./tooltip";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardShield = () => {
  const {
    state: { playerField },
  } = use(GameContext)!;
  const shieldCard = playerField.filter((card) => CARD_LIBRARY[card.id].type === "SHIELD")[0];

  return (
    <div className="Shield">
      {shieldCard ? (
        <CardTooltip card={shieldCard}>
          <div className="Shield--active">{CARD_LIBRARY[shieldCard.id].name}</div>
        </CardTooltip>
      ) : (
        <ShieldStarIcon weight="bold" size={64} />
      )}
    </div>
  );
};
