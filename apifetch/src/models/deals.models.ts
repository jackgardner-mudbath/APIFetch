export type deal = {
    dealID: string
    dealRating: string
    gameID: string
    internalName: string
    isOnSale: number
    lastChange: number
    metacriticLink: string
    metacriticScore: string
    normalPrice: string
    releaseDate: number
    salePrice: string
    savings: string
    steamAppID: string
    steamRatingCount: string
    steamRatingPercent: string
    steamRatingText: string
    storeID: string
    thumb: string
    title: string
}

export type dealsList = deal[]

//URL for redirecting to the deal's store page
export const redirectURL = "https://www.cheapshark.com/redirect?dealID=";