export function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function drawOne<T>(deck: T[]) {
  if (deck.length === 0) return { deck, card: null as T | null };
  const [card, ...rest] = deck;
  return { deck: rest, card };
}
