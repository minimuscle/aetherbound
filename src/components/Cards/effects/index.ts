import { generate } from "components/Cards/effects/mana/generate";
import { modify } from "components/Cards/effects/stats/modify";

export const EFFECTS = {
  stats: {
    modify,
  },
  mana: {
    generate,
  },
} as const;
