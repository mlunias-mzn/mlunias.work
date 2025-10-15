import type { ReactNode } from "react";
import clsx from "clsx";
import ItemList, { type ItemData_Author, type ItemData_Camera, type ItemData_Location } from "../../../cogs/items/data";
import { Link } from "react-router";

import { TbMapPin, TbCamera, TbUser } from "react-icons/tb";
import { getAuthorType } from "../../../cogs/items/items";
import ContentsNavbar from "./ContentsNavbar";

export default function (props: { children?: ReactNode, uuid: string }) {
    const uuid = props.uuid
    const data = ItemList[uuid]
    if (!data) return null

    return (
        <div
            className="card card-border bg-base-100 w-full max-w-[700px] p-4 place-items-center shadow-md"
            data-uuid={uuid}
        >
            <div
                className={clsx(
                    "card rounded-box grid grow place-items-center bg-base-300",
                    "overflow-hidden cursor-pointer",
                    "max-w-[600px] max-h-[min(80vh, 720px)]",
                    "min-w-[200px]"
                )}
            >
                <Link to={"/" + uuid}>
                    <img
                        className="w-full h-full object-cover"
                        src={"assets/images/contents/" + uuid + ".jpg"}
                        loading="lazy"
                    />
                </Link>
            </div>
            <div className="card-body flex flex-col items-center justify-start px-0 pb-2 w-full max-w-[600px]">
                <Label_Keywords data={data.keywords} />
                <div className="flex flex-col items-end justify-between w-full gap-1 pt-2">
                    <Label_Authors data={data.authors} />
                    <Label_Location data={data.location} />
                    <Label_Camera data={data.camera} />
                </div>
                <div className="divider my-0" />
                <div className="flex flex-row justify-between w-full flex-wrap gap-x-5 gap-y-2">
                    <ContentsNavbar uuid={uuid} />
                    <Label_Date data={data.date} href={"/" + props.uuid} />
                </div>
            </div>
        </div >
    )
}

function Label_Keywords(props: { data?: Array<string> }) {
    const data = props.data
    if (data) {
        return (
            <>
                <div className="flex flex-row gap-1 w-full flex-wrap">
                    {
                        data.map(k => {
                            const word = k.trim()
                            return (
                                <div
                                    key={word}
                                    className="badge badge-md hover:underline text-nowrap whitespace-nowrap bg-base-200 border-1 border-base-content/10 text-base-content"
                                    aria-label={word}
                                >
                                    <Link to={`/search?p=${encodeURIComponent(word)}`}>
                                        {word}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    } else {
        return null
    }
}

function Label_Location(props: { data?: ItemData_Location }) {
    const data = props.data
    if (data) {
        return (
            <LabeledTextContainer>
                <LabeledText
                    icon={<TbMapPin />}
                    label={data.title}
                    href={data.href}
                    tooltip="場所"
                />
            </LabeledTextContainer>
        )
    } else {
        return null
    }
}

function Label_Camera(props: { data?: ItemData_Camera }) {
    const data = props.data
    if (data) {
        return (
            <LabeledTextContainer>
                <LabeledText
                    icon={<TbCamera className="tooltip" />}
                    label={data.make ? `${data.make} /  ${data.model}` : data.model}
                    href={data.href}
                    tooltip="撮影者"
                />
            </LabeledTextContainer>
        )
    } else {
        return null
    }
}

function Label_Authors(props: { data?: Array<ItemData_Author> }) {
    const data = props.data
    if (data) {
        return (
            <LabeledTextContainer>
                {
                    data.map(v => {
                        let authorType = getAuthorType(v.type)

                        return (
                            <LabeledText
                                icon={<TbUser />}
                                label={v.title}
                                href={v.href}
                                tooltip="作者"
                            >
                                {
                                    authorType && <span className="flex pl-2 before:content-['('] after:content-[')']">
                                        {authorType}
                                    </span>
                                }
                            </LabeledText>
                        )
                    })
                }
            </LabeledTextContainer>
        )
    } else {
        return null
    }
}

function Label_Date(props: { data?: Date, href?: string }) {
    const data = props.data
    if (data) {
        return (
            <div
                className="flex items-center justify-end gap-10 text-xs text-base-content/70"
                data-datetime={data.toISOString()}
            >
                <LabeledText
                    label={`${data.getFullYear()}年${data.getMonth() + 1}月${data.getDate()}日`}
                    href={props.href}
                />
            </div>
        )
    } else {
        return null
    }
}

function LabeledTextContainer(props: { children?: ReactNode }) {
    return (
        <div className="flex items-center justify-start flex-wrap w-full gap-x-10 gap-y-1">
            {props.children}
        </div>
    )
}

function LabeledText(props: { icon?: ReactNode, label?: string, children?: ReactNode, href?: string, tooltip?: string }) {
    return (
        <>
            {
                props.href ?
                    <Link to={props.href} className="hover:underline">
                        <span className="flex items-center justify-center whitespace-nowrap">
                            {props.icon && <span className={clsx("pr-2 text-base-content/70", props.tooltip && "tooltip")} data-tip={props.tooltip}>{props.icon}</span>}
                            {props.label}
                            {props.children}
                        </span >
                    </Link>
                    :
                    <span className="flex items-center justify-center whitespace-nowrap">
                        {props.icon && <span className={clsx("pr-2 text-base-content/70", props.tooltip && "tooltip")} data-tip={props.tooltip}>{props.icon}</span>}
                        {props.label}
                        {props.children}
                    </span>
            }
        </>
    )
}