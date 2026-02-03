import { CARD_LIBRARY } from "components/Cards/library";
import type { Element, GameCardId } from "components/Cards/types";
import type { Player, State } from "utils/types/game";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type Stat = "damage" | "health";
type ModifyArgs = {
  stats: Array<{ stat: Stat; amount: number }>;
  cost?: {
    element: Element;
    amount: number;
  };
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const modify = {
  run: (context: { state: State; owner: Player; gameCardId: GameCardId }, args: ModifyArgs): State => {
    const { state, owner, gameCardId } = context;
    const { stats, cost } = args;
    const currentOwner = owner === "PLAYER" ? "player" : "enemy";
    const side = state[currentOwner];

    const card = side.field.find((card) => card.gameCardId === gameCardId);
    const cardIndex = side.field.findIndex((card) => card.gameCardId === gameCardId);
    if (state.activePlayer === "ENEMY" || !card) return state;

    const cardData = CARD_LIBRARY[card.id];
    if ("activations" in cardData && card.activations === cardData.activations) return state;

    let nextFlux = side.flux;

    if (cost) {
      const availableFlux = nextFlux[cost.element] ?? 0;
      if (availableFlux < cost.amount) return state;

      nextFlux = {
        ...nextFlux,
        [cost.element]: availableFlux - cost.amount,
      };
    }

    let nextCard = card;
    const damageDelta = stats.find((entry) => entry.stat === "damage")?.amount ?? 0;
    const healthDelta = stats.find((entry) => entry.stat === "health")?.amount ?? 0;
    const nextDamage = "damage" in cardData ? (card.damage ?? cardData.damage) + damageDelta : card.damage;
    const nextHealth = "health" in cardData ? (card.health ?? cardData.health) + healthDelta : card.health;
    const nextActivations = (card.activations ?? 0) + 1;

    if (nextDamage !== card.damage && nextHealth !== card.health) {
      nextCard = {
        ...card,
        damage: nextDamage,
        health: nextHealth,
        activations: nextActivations,
      };
    }
    const nextField = [...side.field];
    nextField[cardIndex] = nextCard;

    return {
      ...state,
      [currentOwner]: {
        ...side,
        field: nextField,
        flux: nextFlux,
      },
    };
  },
};
