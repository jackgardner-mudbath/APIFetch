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

//Type guards for the custom interfaces/types
export const isGame = (g: any): g is game => {
    return(g as game) !== undefined
}

export const isGameList = (g: any): g is gamesList => {
    return(g as gamesList) !== undefined
}

export const gamesEndPoint = 'https://www.cheapshark.com/api/1.0/games?title=';

export const gameHeadings = [
    "Title",
    "Price",
    "Thumbnail"
]
