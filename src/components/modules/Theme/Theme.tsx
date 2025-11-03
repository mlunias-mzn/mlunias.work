import React, { useEffect, useRef, useState, type JSX, type RefObject } from 'react'

import { ThemeContext } from './ThemeContext'
import { getThemeFromClosestAncestor } from './utils'


export type DataTheme = typeof DEFAULT_THEMES[number] | string

export type ThemeProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  onChange?: (theme: DataTheme) => void
  dataTheme?: DataTheme
}

export const DEFAULT_THEMES = [
  'light',
  'dark',
  'retro',
  'cyberpunk',
  'valentine',
  'forest',
  'aqua',
  'abyss',
  'lemonade',
  'caramellatte',
  'omega'
] as const

const Theme = React.forwardRef<HTMLDivElement, ThemeProps>(
  (
    { children, dataTheme, onChange, className, ...props },
    ref
  ): JSX.Element => {
    // Either use provided ref or create a new ref
    const themeRef = useRef<HTMLDivElement>(
      (ref as RefObject<HTMLDivElement>)?.current
    )

    const closestAncestorTheme = getThemeFromClosestAncestor(themeRef)

    // If no theme is provided, use the closest ancestor theme, if no ancestor theme, fallback to default theme (defined in constants)
    const [theme, setTheme] = useState<DataTheme>(
      dataTheme || closestAncestorTheme || "light"
    )

    const handleThemeChange = (theme: DataTheme) => {
      // Fire custom onChange, if provided. ie, user provided function to store theme in session/local storage
      onChange && onChange(theme)
      // Update state/context
      setTheme(theme)
    }

    // Properly handle changes to theme prop on Theme component
    useEffect(() => {
      if (dataTheme !== theme) {
        dataTheme && handleThemeChange(dataTheme)
      }
    }, [dataTheme])

    return (
      <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
        <div {...props} data-theme={theme} className={className} ref={themeRef}>
          {children}
        </div>
      </ThemeContext.Provider>
    )
  }
)
export default Theme
