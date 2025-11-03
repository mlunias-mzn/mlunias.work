import clsx from "clsx"
import type { DetailedHTMLProps, ElementType, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

export interface CardTitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    align?: "center" | "start" | "end",
    tag?: ElementType
}

const cardTitleClassName = tv({
    base: "card-title flex gap-4 text-2xl justify-center",
    variants: {
        align: {
            start: "justify-start",
            end: "justify-end",
            center: "justify-center",
        }
    },
    defaultVariants: {
        align: "center"
    }
})

export default function CardTitle(props: CardTitleProps) {
    const {
        tag,
        align,
        className,
        children,
        ...h2Props
    } = props

    const Tag = tag ?? "h2"

    return (
        <Tag
            {...h2Props}
            className={twMerge(
                cardTitleClassName({
                    align
                }),
                className
            )}
        >
            {children}
        </Tag>
    )
}