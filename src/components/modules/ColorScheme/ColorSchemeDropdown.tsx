
import { useEffect, useState } from "react";
import { TbDeviceDesktop } from "react-icons/tb";
import ThemeIcon from "./ThemeIcon";
import Dropdown from "../Dropdown/Dropdown";
import { changeTheme, getCurrentColorSchemeMode } from "./ColorScheme";

export default function ColorSchemeDropdown() {
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

    function DropdownTheme(props: { label: string, theme: string }) {
        return (
            <Dropdown.Item
                active={colorSchemeMode == props.theme}
                data-theme-id={props.theme}
                data-theme-label={props.label}
            >
                <a onClick={() => handleChange(props.theme)} aria-label={props.label}>
                    <ThemeIcon theme={props.theme} />{props.label}
                </a>
            </Dropdown.Item>
        )
    }

    return (
        <Dropdown
            align="end"
            button={
                <div tabIndex={0} role="button" className="btn group btn-sm gap-1.5 px-1.5 btn-link btn-accent m-1">
                    <ThemeIcon />
                    <svg width="12px" height="12px" className="mt-px size-2 fill-current opacity-60 text-primary-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                    </svg>
                </div>
            }
        >
            <Dropdown.Label>テーマ</Dropdown.Label>
            <Dropdown.Item active={colorSchemeMode == "system"}>
                <a onClick={() => handleChange("system")} aria-label="自動">
                    <TbDeviceDesktop className="size-[1.2em]" />自動
                </a>
            </Dropdown.Item>
            <DropdownTheme label="ライト" theme="light" />
            <DropdownTheme label="ダーク" theme="dark" />
            <Dropdown.Divider />
            <DropdownTheme label="レトロ" theme="retro" />
            <DropdownTheme label="バレンタイン" theme="valentine" />
            <DropdownTheme label="フォレスト" theme="forest" />
            <DropdownTheme label="アクア" theme="aqua" />
            <DropdownTheme label="サイバーパンク" theme="cyberpunk" />
            <DropdownTheme label="アビス" theme="abyss" />
            <DropdownTheme label="レモネード" theme="lemonade" />
            <DropdownTheme label="キャラメルラテ" theme="caramellatte" />
            <DropdownTheme label="オメガ" theme="omega" />
        </Dropdown>
    )
}