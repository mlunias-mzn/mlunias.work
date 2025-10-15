
import clsx from "clsx";
import { useEffect, useState } from "react";
import { TbMoon, TbSun, TbDeviceDesktop } from "react-icons/tb";
import ThemeIcon from "./ThemeIcon";

export function getCurrentColorSchemeMode() {
    const s = localStorage.theme
    if (typeof s == "string") {
        return s
    } else {
        localStorage.setItem('theme', 'system')
        return "system"
    }
}

export function changeTheme(colorSchemeMode?: string) {
    if (!colorSchemeMode) colorSchemeMode = localStorage.getItem('theme') ?? "system"

    if (typeof colorSchemeMode == "string" && colorSchemeMode !== "system") {
        localStorage.setItem('theme', colorSchemeMode)
        document.documentElement.setAttribute("data-theme", colorSchemeMode)
    } else {
        localStorage.setItem('theme', 'system')
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute("data-theme", "dark")
        } else {
            document.documentElement.setAttribute("data-theme", "light")
        }
    }
}

export default function () {
    const [colorSchemeMode, setColorSchemeMode] = useState<string>(getCurrentColorSchemeMode())
    const [colorScheme, setColorScheme] = useState<string>(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")

    const handleChange = (value: string) => {
        setColorSchemeMode(value)
        if (value == "system") {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setColorScheme("dark")
            } else {
                setColorScheme("light")
            }
        } else {
            setColorScheme(value)
        }
        changeTheme(value)
    }

    useEffect(() => {
        const mediaQueryLlistener = (e: MediaQueryListEvent) => {
            const s = getCurrentColorSchemeMode()
            if (s == "system") {
                setColorSchemeMode("system")
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    setColorScheme("dark")
                } else {
                    setColorScheme("light")
                }
            }
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaQueryLlistener)
    }, [])

    function DropdownItem(props: { label: string, theme: string }) {
        return (
            <li
                className={clsx(colorSchemeMode == props.theme && "menu-active", "rounded-md")}
                data-theme-id={props.theme}
                data-theme-label={props.label}
            >
                <a onClick={() => handleChange(props.theme)} aria-label={props.label}>
                    <ThemeIcon theme={props.theme} />{props.label}
                </a>
            </li>
        )
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn group btn-sm gap-1.5 px-1.5 btn-link btn-accent m-1">
                <ThemeIcon />
                <svg width="12px" height="12px" className="mt-px size-2 fill-current opacity-60 text-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabIndex={-1} className="dropdown-content menu rounded-box bg-base-200 text-base-content z-1 w-52 p-2 shadow-lg border-base-content/10 border-1">
                <li className="menu-title">テーマ</li>
                <li className={clsx(colorSchemeMode == "system" && "menu-active", "rounded-md")}>
                    <a onClick={() => handleChange("system")} aria-label="自動">
                        <TbDeviceDesktop className="size-[1.2em]" />自動
                    </a>
                </li>
                <DropdownItem label="ライト" theme="light" />
                <DropdownItem label="ダーク" theme="dark" />
                <div className="divider my-0" />
                <DropdownItem label="レトロ" theme="retro" />
                <DropdownItem label="バレンタイン" theme="valentine" />
                <DropdownItem label="フォレスト" theme="forest" />
                <DropdownItem label="アクア" theme="aqua" />
                <DropdownItem label="サイバーパンク" theme="cyberpunk" />
                <DropdownItem label="アビス" theme="abyss" />
                <DropdownItem label="レモネード" theme="lemonade" />
                <DropdownItem label="キャラメルラテ" theme="caramellatte" />
                <DropdownItem label="オメガ" theme="omega" />
            </ul>
        </div>
    )
}