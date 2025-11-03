import type { DetailedHTMLProps, HTMLAttributes } from "react"
import clsx from "clsx"

export interface DropdownItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    active?: boolean
}

export default function DropdownItem(props: DropdownItemProps) {
    const { active, className, ...liProps } = props

    return (
        <li
            {...liProps}
            aria-selected={active}
            className={clsx(
                active && "menu-active",
                "rounded-md",
                className
            )}
        />
    )
}