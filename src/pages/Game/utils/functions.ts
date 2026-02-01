import { EFFECTS } from "components/Cards/effects";
import { CARD_LIBRARY } from "components/Cards/library";
import type { CardNames, CardTrigger, EffectRef, GameCard, GameCardId, TriggeredEffects } from "components/Cards/types";
import type { Player, State } from "utils/types/game";

export function shuffle(arr: CardNames[]) {
  const copy = [...arr];

  // Fisher–Yates shuffle
  for (let index = copy.length - 1; index > 0; index--) {
    const j = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[j]] = [copy[j], copy[index]];
  }

  // Convert to instances AFTER shuffle
  return copy.map((id, gameCardId) => ({
    id,
    gameCardId: (gameCardId + 1) as unknown as GameCardId,
  }));
}

export function drawCard(deck: GameCard[], numberOfCards = 1) {
  const cards = deck.slice(0, numberOfCards);
  const rest = deck.slice(numberOfCards);

  return { deck: rest, cards };
}

export const generateRandomPlayer = () => (Math.random() < 0.5 ? "PLAYER" : "ENEMY");

export const getCardInstance = (state: State, owner: Player, gameCardId: GameCardId): GameCard | undefined => {
  const side = owner === "PLAYER" ? state.player : state.enemy;
  return side.field.find((card) => card.gameCardId === gameCardId);
};

const runEffect = (state: State, ctx: { owner: Player; gameCardId: GameCardId }, eff: EffectRef): State => {
  const [group, name] = eff.id.split(".") as [keyof typeof EFFECTS, string];

  const runner = EFFECTS[group]?.[name]?.run as ((ctx: unknown, args: unknown) => State) | undefined;

  if (!runner) {
    console.warn(`Unknown effect id: ${eff.id}`);
    return state;
  }

  return runner({ state, ...ctx }, eff.args);
};

export const runCardTrigger = (state: State, owner: Player, gameCardId: GameCardId, trigger: CardTrigger): State => {
  const sideKey = owner === "PLAYER" ? "player" : "enemy";
  const card = state[sideKey].field.find((c) => c.gameCardId === gameCardId);
  if (!card) return state;

  const def = CARD_LIBRARY[card.id];
  const effects = def.triggers?.[trigger] ?? [];
  if (effects.length === 0) return state;

  return effects.reduce((next, eff) => runEffect(next, { owner, gameCardId }, eff), state);
};

export const checkIsActiable = (triggers: TriggeredEffects, state: State) => {
  if (!("onActivated" in triggers) || !("args" in triggers.onActivated?.[0])) return false;
  if (!("cost" in triggers.onActivated[0].args)) return true;

  const activePlayer = state.activePlayer === "PLAYER" ? state.player : state.enemy;
  return activePlayer.mana[triggers.onActivated[0].args.cost?.element] >= triggers.onActivated[0].args.cost?.amount;
};
