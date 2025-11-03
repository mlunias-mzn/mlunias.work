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