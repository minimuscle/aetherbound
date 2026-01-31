import { CARD_LIBRARY } from "components/Cards/library";
import type { Element } from "components/Cards/types";
import { runCardTrigger } from "pages/Game/utils/functions";
import type { State } from "utils/types/game";

export const endTurn = (state: State): State => {
  const playerFieldDamage = state.player.field.reduce((acc, card) => {
    const base = CARD_LIBRARY[card.id]?.damage ?? 0;
    const dmg = card.damage ?? base;
    return acc + dmg;
  }, 0);

  const addMana = (mana: State["player"]["mana"], element: Element, amount = 1) => {
    return { ...mana, [element]: (mana[element] ?? 0) + amount };
  };

  const mana = state.player.field.reduce(
    (mana, cardKey) => {
      const card = CARD_LIBRARY[cardKey.id];
      if (card.type !== "RUNE") return mana;

      return addMana(mana, card.mana.element, card.mana.amount); //{ ...mana, [card.mana.element]: mana[card.mana.element as keyof typeof mana] + card.mana.amount };
    },
    addMana(state.player.mana, state.player.attunement),
  );

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
      mana,
    },
  };

  const owner = state.activePlayer;
  const sideKey = owner === "PLAYER" ? "player" : "enemy";
  const fieldIds = state[sideKey].field.map((c) => c.gameCardId);

  for (const id of fieldIds) {
    next = runCardTrigger(next, owner, id, "onTurnEnd");
  }
  console.log(next);

  return next;
};
