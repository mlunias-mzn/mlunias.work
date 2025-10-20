import type { ReactNode } from "react"
import clsx from "clsx"
import { Link } from "react-router"
import { TbHome, TbSearch, TbBell, TbUser } from "react-icons/tb";

function Sidebar(props: { selected?: string }) {
    function SidebarButton(props: {
        keyName: string,
        label?: string,
        selected?: string,
        href?: string
        children?: ReactNode
    }) {
        const isSelected: boolean = props.selected == props.keyName && props.selected !== undefined
        const href: string = props.href ?? `/${props.keyName}`

        return (
            <li>
                <Link
                    className={clsx(
                        isSelected && "menu-active",
                        "hidden",
                        "lg:flex"
                    )}
                    aria-label={props.label}
                    data-button-key={props.keyName}
                    aria-selected={isSelected}
                    to={href}
                >
                    {props.children}
                    {props.label}
                </Link>
                <Link
                    className={clsx(
                        isSelected && "menu-active",
                        "tooltip",
                        "tooltip-right",
                        "lg:hidden"
                    )}
                    aria-label={props.label}
                    data-button-key={props.keyName}
                    data-tip={props.label}
                    aria-selected={isSelected}
                    to={href}
                >
                    {props.children}
                </Link>
            </li>
        )
    }

    return (
        <div className="drawer drawer-open hidden md:grid text-neutral-content">
            <input id="drawer-value" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side overflow-visible">
                <ul className="menu bg-neutral min-h-full lg:w-80 p-4 gap-5 lg:gap-2">
                    <SidebarButton keyName="home" label="ホーム" selected={props.selected} href="/">
                        <TbHome className="size-[1.9em]" />
                    </SidebarButton>
                    <SidebarButton keyName="search" label="検索" selected={props.selected}>
                        <TbSearch className="size-[1.9em]" />
                    </SidebarButton>
                    <SidebarButton keyName="notifications" label="通知" selected={props.selected}>
                        <TbBell className="size-[1.9em]" />
                    </SidebarButton>
                    <SidebarButton keyName="profile" label="プロフィール" selected={props.selected}>
                        <TbUser className="size-[1.9em]" />
                    </SidebarButton>
                </ul>
            </div>
        </div>
    )
}