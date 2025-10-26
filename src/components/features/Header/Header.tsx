import { Link } from "react-router"
import clsx from "clsx"
import ColorScheme from "../../modules/ColorScheme/ColorScheme"
import Logo from "../../modules/SVG/Logo"
import Avatar from "../../modules/Avatar/Avatar"
import { useEffect, useState, type DetailedHTMLProps, type HTMLAttributes } from "react"
import Dropdown, { DropdownDivider, DropdownItem } from "../../modules/Dropdown/Dropdown"

export default function () {
    return (
        <div className={clsx(
            "navbar shadow-lg",
            "bg-primary text-primary-content",
            "border-b-base-content/10 border-b-1",
            "sticky top-0 z-1 w-[100vw] px-10"
        )}
        >
            <div className="flex flex-1 items-center">
                <Link to="/" className="inline-block text-primary-content hover:text-primary-content/70">
                    <Logo />
                </Link>
            </div>
            <div className="flex gap-2 items-center">
                <ColorScheme />
                <AvatarDropdown />
            </div>
        </div>
    )
}

function AvatarDropdown() {
    const [username, setUsername] = useState<string | undefined>()

    useEffect(() => {

    }, [])

    if (username) {
        return (
            <Dropdown
                align="end"
                button={<Avatar
                    src="assets/images/profile/003.jpg"
                    aria-label="プロフィール"
                    alt="プロフィール画像"
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer"
                />}
            >
                <AvatarDropdownItem to="/profile" label="プロフィール" />
                <AvatarDropdownItem to="/post" label="投稿" />
                <AvatarDropdownItem to="/option" label="設定" />
                <DropdownDivider />
                <AvatarDropdownItem to="/logout" label="ログアウト" />
            </Dropdown>
        )
    } else {
        return (
            <Dropdown
                align="end"
                button={<Avatar
                    src="assets/images/profile/003.jpg"
                    aria-label="プロフィール"
                    alt="プロフィール画像"
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer"
                />}
            >
                <AvatarDropdownItem key="signup" to="/auth?action=signup" label="登録" />
                <DropdownDivider />
                <AvatarDropdownItem key="login" to="/auth?action=login" label="ログイン" />
            </Dropdown>
        )

    }
}


function AvatarDropdownItem(props: {
    to?: string
    label?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>) {
    return (
        <DropdownItem
            {...props}
            aria-label={props.label}
        >
            {props.to ?
                <Link to={props.to}>
                    {props.label}
                    {props.children}
                </Link>
                :
                <a>
                    {props.label}
                    {props.children}
                </a>
            }
        </DropdownItem>
    )
}