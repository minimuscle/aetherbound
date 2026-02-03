import { generate } from "components/Cards/effects/flux/generate";
import { modify } from "components/Cards/effects/stats/modify";

export const EFFECTS = {
  stats: {
    modify,
  },
  flux: {
    generate,
  },
} as const;
