import { CARD_LIBRARY } from "components/Cards/library";
import { runCardTrigger } from "pages/Game/utils/functions";
import type { State } from "utils/types/game";

export const endTurn = (state: State): State => {
  const activePlayer = state.activePlayer === "PLAYER" ? state.player : state.enemy;
  const otherPlayer = state.activePlayer === "PLAYER" ? state.enemy : state.player;

  const fieldDamage = activePlayer.field.reduce((acc, card) => {
    const base = CARD_LIBRARY[card.id]?.damage ?? 0;
    const dmg = card.damage ?? base;
    return acc + dmg;
  }, 0);

  const newOtherHealth = otherPlayer.health - fieldDamage < 0 ? 0 : otherPlayer.health - fieldDamage;

  let next: State = {
    ...state,
    activePlayer: state.activePlayer === "PLAYER" ? "ENEMY" : "PLAYER",
    [state.activePlayer.toLowerCase() as "player" | "enemy"]: {
      ...activePlayer,
      mana: {
        ...activePlayer.mana,
        [activePlayer.attunement]: activePlayer.mana[activePlayer.attunement] + 1,
      },
    },
    [state.activePlayer === "PLAYER" ? "enemy" : "player"]: {
      ...otherPlayer,
      health: newOtherHealth,
    },
    nextPhase: newOtherHealth <= 0 ? "GAME_OVER" : "TURN_START",
    turn: state.turn + 1,
  };

  const owner = state.activePlayer;
  const sideKey = owner === "PLAYER" ? "player" : "enemy";
  const fieldIds = state[sideKey].field.map((c) => c.gameCardId);

  for (const id of fieldIds) {
    next = runCardTrigger(next, owner, id, "onTurnEnd");
  }

  return next;
};
