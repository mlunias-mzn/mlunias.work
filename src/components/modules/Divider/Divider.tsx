import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    position?: "start" | "end"
    direction?: "horizontal" | "vertical"
}

const dividerClassName = tv({
    base: "divider",
    variants: {
        color: {
            neutral: "divider-neutral",
            primary: "divider-primary",
            secondary: "divider-secondary",
            accent: "divider-accent",
            info: "divider-info",
            success: "divider-success",
            warning: "divider-warning",
            error: "divider-error"
        },
        position: {
            start: "divider-start",
            end: "divider-end"
        },
        direction: {
            horizontal: "divider-horizontal",
            vertical: "divider-vertical"
        }
    }
})

export default function Divider(props: DividerProps) {
    const {
        color,
        position,
        direction,
        children,
        className,
        ...divProps
    } = props

    return (
        <div
            {...divProps}
            className={twMerge(
                dividerClassName({
                    color, position, direction
                }),
                className
            )}
        >
            {children}
        </div>
    )
}