import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export default function Dropdown(props: {
    children?: ReactNode
    button?: ReactNode
    position?: "top" | "bottom" | "right" | "left"
    align?: "start" | "center" | "end"
    hover?: boolean
    open?: boolean
}) {
    return (
        <div
            className={clsx(
                "dropdown",
                props.position && ("dropdown-" + props.position),
                props.align && ("dropdown-" + props.align),
                props.hover && "dropdown-hover",
                props.open && "dropdown-open"
            )}
        >
            {props.button}
            <ul
                tabIndex={-1}
                className={clsx(
                    "dropdown-content menu",
                    "bg-base-300 text-base-content",
                    "border-1 border-base-content/10",
                    "rounded-box z-1 w-52 p-2 shadow-lg"
                )}
            >
                {props.children}
            </ul>
        </div>
    )
}

export function DropdownItem(props: {
    active?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
    return (
        <li
            {...props}
            className={clsx(props.active && "menu-active", "rounded-md", props.className)}
        />
    )
}

export function DropdownLabel(props: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
    return (
        <li
            {...props}
            className={clsx("menu-title", props.className)}
        />
    )
}

export function DropdownDivider(props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    return (
        <div
            {...props}
            className={clsx("divider my-0", props.className)}
        />
    )
}