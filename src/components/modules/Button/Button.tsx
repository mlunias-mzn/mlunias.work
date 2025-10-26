import clsx from "clsx"
import type { ReactNode } from "react"

export default function Button(props: {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    variant?: "outline" | "dash" | "soft" | "ghost" | "link"
    active?: boolean
    wide?: boolean
    block?: boolean
    square?: boolean
    circle?: boolean
    startAdornment?: ReactNode
    endAdornment?: ReactNode
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    const {
        size,
        color,
        variant,
        active,
        disabled,
        wide,
        block,
        square,
        circle,
        className,
        startAdornment,
        endAdornment,
        children,
        ...buttonProps
    } = props

    return (
        <button
            {...buttonProps}
            aria-disabled={disabled}
            className={clsx(
                "btn",
                size == "xs" && "btn-xs",
                size == "sm" && "btn-sm",
                size == "md" && "btn-md",
                size == "lg" && "btn-lg",
                size == "xl" && "btn-xl",
                color == "neutral" && "btn-neutral",
                color == "primary" && "btn-primary",
                color == "secondary" && "btn-secondary",
                color == "accent" && "btn-accent",
                color == "info" && "btn-info",
                color == "success" && "btn-success",
                color == "warning" && "btn-warning",
                color == "error" && "btn-error",
                variant == "outline" && "btn-outline",
                variant == "dash" && "btn-dash",
                variant == "soft" && "btn-soft",
                variant == "ghost" && "btn-ghost",
                variant == "link" && "btn-link",
                active && "btn-active",
                disabled && "btn-disabled",
                wide && "btn-wide",
                block && "btn-block",
                square && "btn-square",
                circle && "btn-circle",
                className,
            )}
        >
            {startAdornment}
            {children}
            {endAdornment}
        </button>
    )
}