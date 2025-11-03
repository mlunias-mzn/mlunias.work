import { useRef, type AnchorHTMLAttributes, type DetailedHTMLProps, type ReactNode } from "react";
import clsx from "clsx";
import { Link, useNavigate } from "react-router";

import Layout from "../../features/Layout/Layout";
import Tab from "../../modules/Tab/Tab";
import ContentGeneral from "./ContentGeneral";

export default function (props: { target?: "profile" | "privacy" }) {
    const { target } = props
    const navigate = useNavigate()

    return (
        <Layout pageName="profile">
            <title>設定 | MILE</title>
            <div className="flex gap-4 w-full p-4 flex-col items-center">
                <div className="card card-border bg-base-100 w-full max-w-[700px] p-1 place-items-center shadow-md">
                    <Tab variant="box" className="mb-4" data-action-type={target ?? "general"}>
                        <TabItem active={target == undefined} to="/option">全般</TabItem>
                        <TabItem active={target == "profile"} to="/option/profile">プロフィール</TabItem>
                        <TabItem active={target == "privacy"} to="/option/privacy">プライバシー</TabItem>
                    </Tab>
                    <div className="card-body w-full">
                        {target == undefined && <ContentGeneral />}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function TabItem(props: {
    to: string
    active?: boolean
    disabled?: boolean
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
    const {
        to,
        className,
        active,
        disabled,
        children,
        ...aProps
    } = props

    return (
        <Link
            to={to}
            aria-disabled={disabled}
            aria-selected={active}
            role={"tab"}
            {...aProps}
            className={clsx(
                "tab",
                active && "tab-active",
                disabled && "tab-disabled",
                className
            )}
        >
            {children}
        </Link>
    )
}