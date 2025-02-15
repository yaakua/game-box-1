"use client"

import {useEffect} from "react"
import {useSessionStorage} from "react-use"
import {fetchGet} from "../utils"

type FavoritesProps = {
    storageKey: string
    toolId: number
    data?: any
    expires?: number
}

export function useFavorites<T = any, I = string>(
    key: string,
    some: (data: T, v: I) => boolean,
) {
    const [value, setValue] = useSessionStorage<T[]>(key, [] as T[])

    const isFavorite = (v: I) => {
        return value.some((item) => some(item, v))
    }

    const addFavorite = (item: T) => {
        setValue([...value, item])
    }

    return {
        data: value,
        isFavorite,
        addFavorite,
    }
}

export default function FavoritesProvider({storageKey, toolId, data = []}: FavoritesProps) {
    const [_, setValue] = useSessionStorage(storageKey, data)
    useEffect(() => {
        fetchGet(`/api/tools/chinese-names-generator/favorite?toolId=${toolId}`).then((res: any) => {
            setValue(res)
        })
        return () => {
            setValue(undefined)
        }
    }, [storageKey, toolId, setValue])
    return <div></div>
}