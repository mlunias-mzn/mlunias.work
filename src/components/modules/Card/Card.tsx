import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import CardBody from "./CardBody"
import CardTitle from "./CardTitle"
import CardImage from "./CardImage"
import CardActions from "./CardActions"

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    variant?: "border" | "dash" | "none"
    align?: "center" | "start" | "end" | "baseline",
    side?: "xs" | "sm" | "md" | "lg" | "xl" | boolean
    imageFull?: boolean
}

const cardClassName = tv({
    base: "card w-full max-w-[700px] p-1 bg-base-100 shadow-lg",
    variants: {
        variant: {
            border: "card-border",
            dash: "card-dash",
            none: ""
        },
        align: {
            center: "place-items-center",
            baseline: "place-items-baseline",
            start: "place-items-start",
            end: "place-items-end"
        },
        size: {
            xs: "card-xs",
            sm: "card-sm",
            md: "card-md",
            lg: "card-lg",
            xl: "card-xl"
        },
        side: {
            xs: "xs:card-side",
            sm: "sm:card-side",
            md: "md:card-side",
            lg: "lg:card-side",
            xl: "xl:card-side",
            true: "card-side",
            false: ""
        },
        imageFull: {
            true: "image-full",
            false: ""
        }
    }
})

function Card(props: CardProps) {
    const {
        size,
        variant,
        align,
        side,
        imageFull,
        className,
        children,
        ...divProps
    } = props

    return (
        <div
            {...divProps}
            className={twMerge(
                cardClassName({
                    size, variant, align, side, imageFull
                }),
                className
            )}
        >
            {children}
        </div >
    )
}


export default Object.assign(Card, {
    Title: CardTitle,
    Body: CardBody,
    Image: CardImage,
    Actions: CardActions
})