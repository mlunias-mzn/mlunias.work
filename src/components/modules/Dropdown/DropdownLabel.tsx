import clsx from "clsx";
import type { DetailedHTMLProps, ElementType, HTMLAttributes } from "react";

export interface DropdownLabelProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    tag?: ElementType
}

export function DropdownLabel(props: DropdownLabelProps) {
    const {
        tag,
        className,
        ...liProps
    } = props

    const Tag = tag ?? "li"

    return (
        <Tag
            {...liProps}
            className={clsx("menu-title", className)}
        />
    )
}