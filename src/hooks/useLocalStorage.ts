import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key)
            return raw ? (JSON.parse(raw) as T) : initial
        } catch (e) {
            console.error('useLocalStorage parse error', e)
            return initial
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state))
        } catch (e) {
            console.error('useLocalStorage set error', e)
        }
    }, [key, state])

    return [state, setState] as const
}