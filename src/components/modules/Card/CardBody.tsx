import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

export interface CardBodyProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    align?: "center" | "start" | "end" | "baseline"
}

const cardBodyClassName = tv({
    base: "flex flex-col justify-between w-full gap-1 pt-2",
    variants: {
        align: {
            start: "items-start",
            end: "items-end",
            center: "items-center",
            baseline: "items-baseline"
        }
    },
    defaultVariants: {
        align: "center"
    }
})

export default function CardBody(props: CardBodyProps) {
    const {
        align,
        children,
        className,
        ...divProps
    } = props

    return (
        <div className="card-body">
            <div
                {...divProps}
                className={twMerge(
                    cardBodyClassName({
                        align
                    }),
                    className
                )}
            >
                {children}
            </div>
        </div>
    )
}