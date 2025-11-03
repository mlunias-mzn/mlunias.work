import type { ElementType, ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    color?: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    variant?: "outline" | "dash" | "soft" | "ghost" | "link"
    active?: boolean
    wide?: boolean
    block?: boolean
    shape?: "square" | "circle"
    responsive?: boolean
    glass?: boolean
    label?: string
    startAdornment?: ReactNode
    endAdornment?: ReactNode
}

const buttonClassName = tv({
    base: "btn",
    variants: {
        size: {
            xs: "btn-xs",
            sm: "btn-sm",
            md: "btn-md",
            lg: "btn-lg",
            xl: "btn-xl"
        },
        color: {
            neutral: "btn-neutral",
            primary: "btn-primary",
            secondary: "btn-secondary",
            accent: "btn-accent",
            info: "btn-info",
            success: "btn-success",
            warning: "btn-warning",
            error: "btn-error"
        },
        variant: {
            outline: "btn-outline",
            dash: "btn-dash",
            soft: "btn-soft",
            ghost: "btn-ghost",
            link: "btn-link"
        },
        active: {
            true: "btn-active"
        },
        disabled: {
            true: "btn-disabled"
        },
        wide: {
            true: "btn-wide"
        },
        block: {
            true: "btn-block"
        },
        shape: {
            square: "btn-square",
            circle: "btn-circle"
        },
        responsive: {
            true: "btn-xs sm:btn-sm md:btn-md lg:btn-lg"
        },
        glass: {
            true: "glass"
        }
    }
})

export default function Button(props: ButtonProps) {
    const {
        size,
        color,
        variant,
        active,
        disabled,
        wide,
        block,
        shape,
        responsive,
        glass,
        label,
        className,
        startAdornment,
        endAdornment,
        children,
        ...buttonProps
    } = props

    const Tag = "button"

    return (
        <Tag
            {...buttonProps}
            aria-disabled={disabled}
            aria-label={label}
            className={twMerge(
                buttonClassName({
                    size, color, variant, active, disabled, wide, block, shape, responsive, glass
                }),
                className,
            )}
        >
            {startAdornment}
            {label}
            {children}
            {endAdornment}
        </Tag>
    )
}