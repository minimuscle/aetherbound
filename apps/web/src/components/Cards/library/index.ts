import type { CardDefinition, CardKey } from "../types";
import { AETHER_CARDS } from "./aether";
import { AIR_CARDS } from "./air";
import { DARK_CARDS } from "./dark";
import { DEATH_CARDS } from "./death";
import { EARTH_CARDS } from "./earth";
import { FIRE_CARDS } from "./fire";
import { LIFE_CARDS } from "./life";
import { LIGHT_CARDS } from "./light";
import { VOID_CARDS } from "./void";
import { WATER_CARDS } from "./water";

export const CARD_LIBRARY = {
  ...FIRE_CARDS,
  ...WATER_CARDS,
  ...AIR_CARDS,
  ...EARTH_CARDS,
  ...LIFE_CARDS,
  ...DEATH_CARDS,
  ...LIGHT_CARDS,
  ...DARK_CARDS,
  ...AETHER_CARDS,
  ...VOID_CARDS,
} as const satisfies Record<CardKey, CardDefinition>;
