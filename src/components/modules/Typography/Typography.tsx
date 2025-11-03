import type * as CSS from 'csstype';
import clsx from "clsx"
import type { DetailedHTMLProps, ElementType, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { tv } from 'tailwind-variants';

type IHTMLElement<T> =
    T extends "p" ? HTMLParagraphElement :
    T extends "div" ? HTMLDivElement :
    T extends "span" ? HTMLSpanElement :
    T extends "h1" ? HTMLHeadingElement :
    T extends "h2" ? HTMLHeadingElement :
    T extends "h3" ? HTMLHeadingElement :
    T extends "h4" ? HTMLHeadingElement :
    T extends "h5" ? HTMLHeadingElement :
    T extends "h6" ? HTMLHeadingElement :
    HTMLElement

type TypographySize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | CSS.Property.Width<string | number>
type TypographyWeight = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black" | number | string

export interface TypographyProps<
    T extends ElementType
> extends DetailedHTMLProps<HTMLAttributes<IHTMLElement<T>>, IHTMLElement<T>> {
    tag?: T
    size?: TypographySize
    weight?: TypographyWeight
    font?: "sans" | "serif" | "mono"
    align?: "right" | "left" | "center" | "justify" | "start" | "end"
    wrap?: "wrap" | "nowrap" | "balance" | "pretty" | boolean
    color?: "base" | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
    whitespace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "break-spaces"
}


export default function Typography<T extends ElementType = "p">(props: TypographyProps<T>) {
    const {
        tag,
        size,
        weight,
        font,
        align,
        wrap,
        color,
        whitespace,
        className,
        ...pProps
    } = props

    const Tag: ElementType = tag ?? "p"

    return (
        <Tag
            className={twMerge(
                GetSizeClass(size),
                GetWeightClass(weight),
                clsx(
                    font == "sans" && "font-sans",
                    font == "serif" && "font-serif",
                    font == "mono" && "font-mono",
                    align == "right" && "text-right",
                    align == "left" && "text-left",
                    align == "center" && "text-center",
                    align == "justify" && "text-justify",
                    align == "start" && "text-start",
                    align == "end" && "text-end",
                    (wrap == "wrap" || wrap === true) && "text-wrap",
                    (wrap == "nowrap" || wrap === false) && "text-nowrap",
                    wrap == "balance" && "text-balance",
                    wrap == "pretty" && "text-pretty",
                    color == "neutral" && "text-neutral-content",
                    color == "primary" && "text-primary-content",
                    color == "secondary" && "text-secondary-content",
                    color == "accent" && "text-accent-content",
                    color == "info" && "text-info-content",
                    color == "success" && "text-success-content",
                    color == "warning" && "text-warning-content",
                    color == "error" && "text-error-content",
                    color == "base" && "text-base-content",
                    whitespace == "normal" && "whitespace-normal",
                    whitespace == "nowrap" && "whitespace-nowrap",
                    whitespace == "pre" && "whitespace-pre",
                    whitespace == "pre-line" && "whitespace-pre-line",
                    whitespace == "pre-wrap" && "whitespace-pre-wrap",
                    whitespace == "break-spaces" && "whitespace-break-spaces",
                ),
                className
            )}
            {...pProps}
        />
    )
}

function GetSizeClass(size?: TypographySize) {
    if (size == "xs") return "text-xs"
    else if (size == "sm") return "text-sm"
    else if (size == "base") return "text-base"
    else if (size == "lg") return "text-lg"
    else if (size == "xl") return "text-xl"
    else if (size == "xl") return "text-xl"
    else if (size == "2xl") return "text-2xl"
    else if (size == "3xl") return "text-3xl"
    else if (size == "4xl") return "text-4xl"
    else if (size == "5xl") return "text-5xl"
    else if (size == "6xl") return "text-6xl"
    else if (size == "7xl") return "text-7xl"
    else if (size == "8xl") return "text-8xl"
    else if (size == "9xl") return "text-9xl"
    else if (typeof size == "number") return `text-[${size}px]`
    else if (typeof size == "string") return `text-[${size}]`
}

function GetWeightClass(weight?: TypographyWeight) {
    if (weight == "thin") return "font-thin"
    else if (weight == "extralight") return "font-extralight"
    else if (weight == "light") return "font-light"
    else if (weight == "normal") return "font-normal"
    else if (weight == "medium") return "font-medium"
    else if (weight == "semibold") return "font-semibold"
    else if (weight == "bold") return "font-bold"
    else if (weight == "extrabold") return "font-bold"
    else if (weight == "black") return "font-black"
    else if (typeof weight == "number") return `font-[${weight}]`
    else if (typeof weight == "string") return `font-(${weight})`
}