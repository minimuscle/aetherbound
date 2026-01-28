export type CardId = "FIRE_IMP" | "AETHER_BOLT" | "STONE_GOLEM";

export type CardType = "CREATURE" | "SPELL";

export type CardDefinition = {
  id: CardId;
  name: string;
  cost: number;
  rulesText: string;
  effect: "ATTACK";
  damage: number;
} & (
  | {
      type: "CREATURE";
      health: number;
    }
  | { type: "SPELL"; target: "CREATURE" | "PLAYER" | "ALL" }
);

export type CardInstance = {
  instanceId: string; // unique per copy
  cardId: CardId; // points to definition
  owner: "PLAYER" | "ENEMY";
  zone: "DECK" | "HAND" | "BOARD" | "GRAVEYARD";
};
