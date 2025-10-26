import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Divider(props: {
    color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    position?: "start" | "end"
    direction?: "horizontal" | "vertical"
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
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
            className={clsx(
                "divider",
                color == "neutral" && "divider-neutral",
                color == "primary" && "divider-primary",
                color == "secondary" && "divider-secondary",
                color == "accent" && "divider-accent",
                color == "info" && "divider-info",
                color == "success" && "divider-success",
                color == "warning" && "divider-warning",
                color == "error" && "divider-error",
                position == "start" && "divider-start",
                position == "end" && "divider-end",
                direction == "horizontal" && "divider-horizontal",
                direction == "vertical" && "divider-vertical",
                className
            )}
        >
            {children}
        </div>
    )
}