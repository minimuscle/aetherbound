import { CARD_LIBRARY } from "components/Cards/library";
import { runCardTrigger } from "pages/Game/utils/functions";
import type { State } from "utils/types/game";

export const endTurn = (state: State): State => {
  const playerFieldDamage = state.player.field.reduce((acc, card) => {
    const base = CARD_LIBRARY[card.id]?.damage ?? 0;
    const dmg = card.damage ?? base;
    return acc + dmg;
  }, 0);

  const newEnemyHealth = state.enemy.health - playerFieldDamage < 0 ? 0 : state.enemy.health - playerFieldDamage;

  let next: State = {
    ...state,
    activePlayer: "ENEMY",
    enemy: {
      ...state.enemy,
      health: newEnemyHealth,
    },
    nextPhase: newEnemyHealth <= 0 ? "GAME_OVER" : "TURN_START",
    player: {
      ...state.player,
      mana: {
        ...state.player.mana,
        [state.player.attunement]: state.player.mana[state.player.attunement] + 1,
      },
    },
  };

  const owner = state.activePlayer;
  const sideKey = owner === "PLAYER" ? "player" : "enemy";
  const fieldIds = state[sideKey].field.map((c) => c.gameCardId);

  for (const id of fieldIds) {
    next = runCardTrigger(next, owner, id, "onTurnEnd");
  }

  return next;
};
