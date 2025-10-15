import type { ItemData_AuthorType } from "./data"

export interface ItemSearchParams {
    keyword?: string | Array<string>
    category?: string | Array<string>
    date?: Date | { begin: Date, end?: Date }
}

export function searchItem(params: ItemSearchParams) {
    // keywords
    let keywords: Set<string>
    if (typeof params.keyword == "string") {
        keywords = new Set<string>(params.keyword.split(/\s+/))
    } else if (params.keyword !== undefined) {
        keywords = new Set<string>(params.keyword)
    } else {
        keywords = new Set<string>([])
    }

    // category
    let categories: Set<string>
    if (typeof params.category == "string") {
        categories = new Set<string>(params.category.split(/\s+/))
    } else if (params.category !== undefined) {
        categories = new Set<string>(params.category)
    } else {
        categories = new Set<string>([])
    }
}

export function getAuthorType(name?: ItemData_AuthorType) {
    switch (name) {
        case "editor":
            return "編集"
        case "model":
            return "モデル"
        case "photograph":
            return "撮影"
        default:
            return undefined
    }
}