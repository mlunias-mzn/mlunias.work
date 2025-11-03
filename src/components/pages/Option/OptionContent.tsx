import type { ReactNode } from "react"

export function OptionContentCotainer(props: {
    children?: ReactNode
}) {
    return (
        <div className="flex flex-col w-full justify-start items-center">
            {props.children}
        </div>
    )
}

export function OptionContentCategory(props: {
    header?: string
    children?: ReactNode
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {props.header && <h3 className="text-2xl font-bold">{props.header}</h3>}
            <div className="flex flex-col w-full justify-start items-start gap-3">
                {props.children}
            </div>
        </div>
    )
}

export function OptionContent(props: {
    label?: ReactNode
    description?: ReactNode
    children?: ReactNode
}) {
    return (
        <div className="card bg-base-200 w-full">
            <div className="card-body py-3 flex flex-row gap-3 justify-between items-start w-full">
                <div className="flex flex-col gap-1">
                    {props.label && <h4 className="text-base-content text-lg">{props.label}</h4>}
                    {props.description && <p className="text-base-content/70">{props.description}</p>}
                </div>
                <div className="flex flex-col justify-end items-center self-center h-full">
                    {props.children}
                </div>
            </div>
        </div>
    )
}