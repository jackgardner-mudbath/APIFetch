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

export const endpoint = 'https://www.cheapshark.com/api/1.0/games?title=';

export const gameHeadings = [
    "Title",
    "Price",
    "Thumbnail"
]
