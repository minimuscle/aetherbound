import type { CardNames, GameCard, GameCardId } from "components/Cards/types";

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
    gameCardId: gameCardId as unknown as GameCardId,
  }));
}

export function drawCard(deck: GameCard[], numberOfCards = 1) {
  const cards = deck.slice(0, numberOfCards);
  const rest = deck.slice(numberOfCards);

  return { deck: rest, cards };
}

export const generateRandomPlayer = () => (Math.random() < 0.5 ? "PLAYER" : "ENEMY");
