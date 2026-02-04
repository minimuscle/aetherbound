import type { GameCardId } from "components/Cards/types";
import type { Player, State } from "utils/types/game";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type ModifyArgs = {
  amount: number;
};

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const reduce = {
  run: (context: { state: State; owner: Player; gameCardId: GameCardId }, args: ModifyArgs) => {
    // const { state, owner, gameCardId } = context;
    // const { amount } = args;
    // const currentOwner = owner === "PLAYER" ? "player" : "enemy";
    // const side = state[currentOwner];
    console.log("running reduce Trigger", args, context);
  },
};
