import { createElement, HTMLAttributes } from "react";
import { icons } from "./icons.ts";

export type IconName = keyof typeof icons;

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon: IconName;
  width?: number;
  className?: string;
}

export const Icon = ({ icon, className, width, color, ...rest }: Props) => {
  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fill: color,
        width: `${width ?? 40}px`,
      }}
      {...rest}
    >
      {createElement(icons[icon], {
        style: { width: "100%", height: "100%" },
      })}
    </div>
  );
};
