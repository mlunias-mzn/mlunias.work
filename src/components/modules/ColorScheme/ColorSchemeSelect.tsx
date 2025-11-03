
import { useEffect, useState } from "react";
import { TbDeviceDesktop } from "react-icons/tb";
import ThemeIcon from "./ThemeIcon";
import { changeTheme, getCurrentColorSchemeMode } from "./ColorScheme";

export default function ColorSchemeSelect() {
    const [colorSchemeMode, setColorSchemeMode] = useState<string>(getCurrentColorSchemeMode())
    const [colorScheme, setColorScheme] = useState<string>(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value
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

    function SelectItem(props: { label: string, theme: string }) {
        return (
            <option
                key={props.theme}
                value={props.theme}
                data-theme-id={props.theme}
                data-theme-label={props.label}
                aria-label={props.label}
            >
                <ThemeIcon theme={props.theme} />
                {props.label}
            </option>
        )
    }

    return (
        <select
            defaultValue="system"
            value={colorSchemeMode}
            className="select cursor-pointer"
            onChange={handleChange}
        >
            <option
                key={"system"}
                aria-label="自動"
                data-theme-id={"system"}
                data-theme-label={"自動"}
            >
                <TbDeviceDesktop className="size-[1.2em]" />自動
            </option>
            <SelectItem label="ライト" theme="light" />
            <SelectItem label="ダーク" theme="dark" />
            <SelectItem label="レトロ" theme="retro" />
            <SelectItem label="バレンタイン" theme="valentine" />
            <SelectItem label="フォレスト" theme="forest" />
            <SelectItem label="アクア" theme="aqua" />
            <SelectItem label="サイバーパンク" theme="cyberpunk" />
            <SelectItem label="アビス" theme="abyss" />
            <SelectItem label="レモネード" theme="lemonade" />
            <SelectItem label="キャラメルラテ" theme="caramellatte" />
            <SelectItem label="オメガ" theme="omega" />
        </select>
    )
}