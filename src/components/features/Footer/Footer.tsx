import clsx from "clsx"
import type { ReactNode } from "react";
import { Link } from 'react-router';
import { TbHome, TbSearch, TbBell, TbUser } from "react-icons/tb";


function FooterTab(props: {
    keyName: string,
    label?: string,
    selected?: string,
    href?: string
    children?: ReactNode
}) {
    const isSelected: boolean = props.selected == props.keyName && props.selected !== undefined
    const href: string = props.href ?? `/${props.keyName}`

    return (
        <Link
            className={clsx(
                isSelected && "dock-active",
                "text-primary-content hover:text-primary-content/70"
            )}
            aria-label={props.label}
            data-button-key={props.keyName}
            aria-selected={isSelected}
            to={href}
        >
            {props.children}
        </Link>
    )
}

export default function Footer(props: { selected?: string }) {
    return (
        <div
            className={clsx(
                "dock dock-xs shadow-lg",
                "sticky bottom-0 w-[100vw] max-w-[100vw] px-0",
                "bg-primary border-b-base-content/10 border-t-1",
            )}
        >
            <FooterTab keyName="home" label="ホーム" selected={props.selected} href="/">
                <TbHome className="size-[1.5em]" />
            </FooterTab>
            <FooterTab keyName="search" label="検索" selected={props.selected}>
                <TbSearch className="size-[1.5em]" />
            </FooterTab>
            <FooterTab keyName="notifications" label="通知" selected={props.selected}>
                <TbBell className="size-[1.5em]" />
            </FooterTab>
            <FooterTab keyName="profile" label="プロフィール" selected={props.selected}>
                <TbUser className="size-[1.5em] " />
            </FooterTab>
        </div>
    )
}