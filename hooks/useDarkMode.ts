// See: https://usehooks-ts.com/react-hook/use-local-storage
import { useLocalStorage } from './useLocalStorage'
// See: https://usehooks-ts.com/react-hook/use-media-query
import { useMediaQuery } from './useMediaQuery'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

interface UseDarkModeOutput {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
    const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
    const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
        'usehooks-ts-dark-mode',
        defaultValue ?? isDarkOS ?? false,
    )
    return {
        isDarkMode,
        toggleDarkMode: () => setDarkMode(prev => !prev),
    }
}