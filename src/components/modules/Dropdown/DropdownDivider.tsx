import type { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx"
import { twMerge } from "tailwind-merge";

export interface DropdownDividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export function DropdownDivider(props: DropdownDividerProps) {
    const {
        className,
        ...divProps
    } = props

    return (
        <div
            {...divProps}
            className={twMerge(
                "divider",
                clsx("my-0"),
                className
            )}
        />
    )
}