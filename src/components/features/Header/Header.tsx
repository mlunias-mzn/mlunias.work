import { Link } from "react-router"
import clsx from "clsx"
import ColorSchemeDropdown from "../../modules/ColorScheme/ColorSchemeDropdown"
import Logo from "../../modules/SVG/Logo"
import Avatar from "../../modules/Avatar/Avatar"
import { useEffect, useState, type DetailedHTMLProps, type HTMLAttributes } from "react"
import Dropdown from "../../modules/Dropdown/Dropdown"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../../utils/auth/user"

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
                <ColorSchemeDropdown />
                <AvatarDropdown />
            </div>
        </div>
    )
}

function AvatarDropdown() {
    const [username, setUsername] = useState<string | undefined>()
    const [displayName, setDisplayName] = useState<string | undefined>()

    const userMutation = useMutation({
        mutationFn: user,
        onSuccess: (data) => {
            if (data.displayName || data.username) {
                setUsername(data.username)
                setDisplayName(data.displayName)
            }
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
        },
    })

    useEffect(() => {
        userMutation.mutate()
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
                <Dropdown.Label>{displayName ?? username}</Dropdown.Label>
                <AvatarDropdownItem to={`/@${username}`} label="プロフィール" />
                <AvatarDropdownItem to={`/@${username}/post`} label="投稿" />
                <AvatarDropdownItem to={`/option`} label="設定" />
                <Dropdown.Divider />
                <AvatarDropdownItem to="/auth?action=logout" label="ログアウト" />
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
                <AvatarDropdownItem to="/profile" label="プロフィール" />
                <Dropdown.Divider />
                <AvatarDropdownItem key="signup" to="/auth?action=signup" label="登録" />
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
        <Dropdown.Item
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
        </Dropdown.Item>
    )
}