import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import DropdownItem from "./DropdownItem"
import { DropdownLabel } from "./DropdownLabel"
import { DropdownDivider } from "./DropdownDivider"

export interface DropdownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: ReactNode
    button?: ReactNode
    position?: "top" | "bottom" | "right" | "left"
    align?: "start" | "center" | "end"
    hover?: boolean
    open?: boolean
}

function Dropdown(props: DropdownProps) {
    return (
        <div
            className={clsx(
                "dropdown",
                props.position == "top" && "dropdown-top",
                props.position == "bottom" && "dropdown-bottom",
                props.position == "right" && "dropdown-right",
                props.position == "left" && "dropdown-left",
                props.align == "end" && "dropdown-end",
                props.align == "start" && "dropdown-start",
                props.align == "center" && "dropdown-center",
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
                    "border border-base-content/10",
                    "rounded-box z-1 w-52 p-2 shadow-lg"
                )}
            >
                {props.children}
            </ul>
        </div>
    )
}

export default Object.assign(Dropdown, {
    Item: DropdownItem,
    Label: DropdownLabel,
    Divider: DropdownDivider
})