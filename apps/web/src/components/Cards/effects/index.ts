import { generate } from "components/Cards/effects/flux/generate";
import { modify } from "components/Cards/effects/stats/modify";
import { reduce } from "components/Cards/effects/stats/reduce";

export const EFFECTS = {
  stats: {
    modify,
    reduce,
  },
  flux: {
    generate,
  },
} as const;
