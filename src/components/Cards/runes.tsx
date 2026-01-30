import classNames from "classnames";
import { use } from "react";
import { GameContext } from "../../pages/Game/utils/context";
import { CARD_LIBRARY } from "./library";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardRunes = () => {
  const {
    state: { playerField },
  } = use(GameContext)!;
  const runeCards = playerField.filter((card) => CARD_LIBRARY[card.id].type === "RUNE");

  const fireCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "FIRE").length;
  const waterCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "WATER").length;
  const airCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "AIR").length;
  const earthCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "EARTH").length;
  const lightCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "LIGHT").length;
  const darkCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "DARK").length;
  const lifeCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "LIFE").length;
  const deathCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "DEATH").length;
  const aetherCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "AETHER").length;
  const voidCards = runeCards.filter((card) => CARD_LIBRARY[card.id].element === "VOID").length;

  return (
    <div className="Runes">
      <div className={classNames("Runes__rune rune__fire", { "rune__fire--active": fireCards > 0 })}>
        <div className="Runes__runeNumber">{fireCards}</div>
      </div>
      <div className={classNames("Runes__rune rune__water", { "rune__water--active": waterCards > 0 })}>
        <div className="Runes__runeNumber">{waterCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__air", { "rune__air--active": airCards > 0 })}>
        <div className="Runes__runeNumber">{airCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__earth", { "rune__earth--active": earthCards > 0 })}>
        <div className="Runes__runeNumber">{earthCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__light", { "rune__light--active": lightCards > 0 })}>
        <div className="Runes__runeNumber">{lightCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__dark", { "rune__dark--active": darkCards > 0 })}>
        <div className="Runes__runeNumber">{darkCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__life", { "rune__life--active": lifeCards > 0 })}>
        <div className="Runes__runeNumber">{lifeCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__death", { "rune__death--active": deathCards > 0 })}>
        <div className="Runes__runeNumber">{deathCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__aether", { "rune__aether--active": aetherCards > 0 })}>
        <div className="Runes__runeNumber">{aetherCards || ""}</div>
      </div>
      <div className={classNames("Runes__rune rune__void", { "rune__void--active": voidCards > 0 })}>
        <div className="Runes__runeNumber">{voidCards || ""}</div>
      </div>
    </div>
  );
};
