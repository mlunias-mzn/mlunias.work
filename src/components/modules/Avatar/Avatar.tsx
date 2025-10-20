import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function Avatar(props: {
    src: string
    alt?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div
            {...props}
            className={clsx("avatar hover:opacity-80 transition-all duration-300", props.className)}
        >
            <div className="w-10 rounded-full">
                <img alt={props.alt} src={props.src} />
            </div>
        </div>
    )
}