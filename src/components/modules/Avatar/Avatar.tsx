import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Avatar(props: {
    src?: string
    alt?: string
    size?: number
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { size, ...divProps } = props

    return (
        <div
            {...divProps}
            className={clsx("avatar hover:opacity-80 transition-all duration-300", props.className)}
        >
            <div
                className={clsx(
                    "rounded-full",
                    !props.src && "bg-accent"
                )}
                style={{
                    width: `calc(var(--spacing) * ${size ?? 10})`
                }}
            >
                {props.src && <img alt={props.alt} src={props.src} />}
            </div>
        </div>
    )
}