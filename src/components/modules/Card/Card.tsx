import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"

export default function Card(props: {
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { className, children, ...divProps } = props

    return (
        <div
            {...divProps}
            className={clsx("card card-border bg-base-100 w-full max-w-[700px] p-1 place-items-center shadow-md", className)}
        >
            {children}
        </div >
    )
}

export function CardContent(props: {

} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { children, className, ...divProps } = props

    return (
        <div className="card-body">
            <div
                {...divProps}
                className={clsx("flex flex-col items-end justify-between w-full gap-1 pt-2", className)}
            >
                {children}
            </div>
        </div>
    )
}

export function CardTitle(props: {
    align?: "center" | "start" | "end"
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
    const {
        align,
        className,
        children,
        ...h2Props
    } = props

    return (
        <h2
            {...h2Props}
            className={clsx(
                "card-title flex gap-4 text-2xl justify-center",
                align == "center" && "justify-center",
                align == "end" && "justify-end",
                align == "start" && "justify-start",
                className
            )}
        >
            {children}
        </h2>
    )
}