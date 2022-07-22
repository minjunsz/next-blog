import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'

declare global {
    interface WindowEventMap {
        'local-storage': CustomEvent
    }
}

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    // Get from local storage then
    // parse stored json or return initialValue
    const readValue = useCallback((): T => {
        // Prevent build error "window is undefined" but keep keep working
        if (typeof window === 'undefined') {
            return initialValue
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? (parseJSON(item) as T) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return initialValue
        }
    }, [initialValue, key])


    const [storedValue, setStoredValue] = useState<T>(initialValue)

    const setValue: SetValue<T> = (value: T | ((x: T) => T)) => {
        const newValue = value instanceof Function ? value(storedValue) : value
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue))
            setStoredValue(newValue)
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
        }
    }

    useEffect(() => {
        setStoredValue(readValue())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [storedValue, setValue]
}

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
        console.log('parsing error on', { value })
        return undefined
    }
}