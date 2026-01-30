import { BoulesIcon, DropIcon, FireSimpleIcon, MoonIcon, PlantIcon, ShovelIcon, SkullIcon, SparkleIcon, SunIcon, WindIcon } from "@phosphor-icons/react";
import { use } from "react";
import type { Element } from "../../../components/Cards/types";
import { GameContext } from "../utils/context";
import "./mana.scss";

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const ManaSection = () => {
  /***** HOOKS *****/
  const {
    state: { mana },
  } = use(GameContext)!;

  const Icons: Record<Element, React.ReactNode> = {
    FIRE: <FireSimpleIcon size={36} color="#bd0000" weight="fill" />,
    WATER: <DropIcon size={36} color="#0074bd" weight="fill" />,
    AIR: <WindIcon size={36} color="#00bdb0" weight="fill" />,
    EARTH: <ShovelIcon size={36} color="#bd5b00" weight="fill" />,
    LIFE: <PlantIcon size={36} color="#29bd00" weight="fill" />,
    DEATH: <SkullIcon size={36} color="#7b00bd" weight="fill" />,
    LIGHT: <SunIcon size={36} color="#f9f7b3" weight="fill" />,
    DARK: <MoonIcon size={36} color="#636363" weight="fill" />,
    AETHER: <BoulesIcon size={36} color="#fbd828" weight="fill" />,
    VOID: <SparkleIcon size={36} color="#f728fb" weight="fill" />,
  };

  /***** RENDER *****/
  return (
    <div className="Mana">
      {Object.entries(mana).map(([name, amount]) => (
        <div className="Mana__item">
          <div className="Mana__itemIcon">{Icons[name as Element]}</div>
          <p className="Mana__itemText">{amount}</p>
        </div>
      ))}
    </div>
  );
};
