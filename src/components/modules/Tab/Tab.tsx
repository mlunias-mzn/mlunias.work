import clsx from "clsx"
import type { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Tab(props: {
    variant?: "box" | "border" | "lift"
    position?: "top" | "bottom"
    size?: "xs" | "sm" | "md" | "lg" | "xl"
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const {
        variant,
        position,
        size,
        children,
        className,
        role,
        ...divProps
    } = props

    return (
        <div
            role={"tablist"}
            {...divProps}
            className={twMerge(
                "tabs",
                "w-max",
                clsx(
                    variant == "box" && "tabs-box",
                    variant == "border" && "tabs-border",
                    variant == "lift" && "tabs-lift",
                    position == "top" && "tabs-top",
                    position == "bottom" && "tabs-bottom",
                    size == "xs" && "tabs-xs",
                    size == "sm" && "tabs-sm",
                    size == "md" && "tabs-md",
                    size == "lg" && "tabs-lg",
                    size == "xl" && "tabs-xl"
                ),
                className
            )}
        >
            {children}
        </div>
    )
}

export function TabItem(props: {
    active?: boolean
    disabled?: boolean
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    const {
        className,
        active,
        disabled,
        children,
        ...aProps
    } = props

    return (
        <a
            aria-disabled={disabled}
            aria-selected={active}
            role={"tab"}
            {...aProps}
            className={clsx(
                "tab",
                active && "tab-active",
                disabled && "tab-disabled",
                className
            )}
        >
            {children}
        </a>
    )
}