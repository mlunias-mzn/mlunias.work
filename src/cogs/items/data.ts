export type ItemData_Category = "cosplay" | "esports" | "landscape"
export type ItemData_AuthorType = "photograph" | "model" | "editor"

export interface ItemData_Location {
    title: string
    href?: string
}
export interface ItemData_Camera {
    model: string
    make?: string
    href?: string
}
export interface ItemData_Author {
    title: string
    type?: ItemData_AuthorType
    href?: string
}
export interface ItemData_Origin {
    title: string
    character?: string
    author?: string
    href?: string
}
export interface ItemData {
    content: string
    category: ItemData_Category
    keywords?: Array<string>
    title?: string
    description?: string
    date?: Date
    location?: ItemData_Location
    camera?: ItemData_Camera
    authors?: Array<ItemData_Author>
    origin?: ItemData_Origin
}

const ItemList: Record<string, ItemData> = {
    "22e2700d-61f9-68ab-6306-8ff76ce6bf23": {
        content: "22e2700d-61f9-68ab-6306-8ff76ce6bf23.jpg",
        category: "cosplay",
        keywords: ["コスプレ", "VALORANT", "ジェット", "ハコスタジアム大阪", "まいる", "NS"],
        authors: [
            { title: "NS", type: "photograph", href: "https://x.com/NS_Photograph" },
            { title: "まいる", type: "model", href: "https://x.com/mlunias" }
        ],
        location: { title: "ハコスタジアム大阪" },
        camera: { model: "α7 III", make: "SONY" },
        date: new Date(2024, 10, 26, 14, 32),
        origin: { character: "ジェット", title: "VALORANT", author: "Riot Games" },
    },
    "19aef1bc-5035-9c0b-0e98-93c623b17ee2": {
        content: "19aef1bc-5035-9c0b-0e98-93c623b17ee2",
        category: "cosplay",
        keywords: ["コスプレ", "VALORANT", "ジェット", "ハコスタジアム大阪", "まいる", "NS"],
        authors: [
            { title: "NS", type: "photograph", href: "https://x.com/NS_Photograph" },
            { title: "まいる", type: "model", href: "https://x.com/mlunias" }
        ],
        location: { title: "ハコスタジアム大阪" },
        camera: { model: "α7 III", make: "SONY" },
        date: new Date(2024, 10, 26, 14, 47),
        origin: { character: "ジェット", title: "VALORANT", author: "Riot Games" },
    }
}

export default ItemList