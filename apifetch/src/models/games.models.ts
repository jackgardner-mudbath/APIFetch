export interface game {
    cheapest: string
    cheapestDealID: string
    external: string
    gameID: string
    internalName: string
    steamAppID: string
    thumb: string
}

export type gamesList = game[]

export const gameHeadings = [
    "Title",
    "Price",
    "Thumbnail"
]