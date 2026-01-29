import type { CardDefinition, CardKey } from "../types";
import { FIRE_CARDS } from "./fire";

export const CARD_LIBRARY = {
  ...FIRE_CARDS,
} as const satisfies Record<CardKey, CardDefinition>;
