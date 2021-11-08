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

//Type guard for the custom interface/type above
export const isDeal = (d:any): d is deal => {
    return (d as deal) !== undefined
}

//URL for redirecting to the deal's store page
export const redirectURL = "https://www.cheapshark.com/redirect?dealID=";

export const dealEndPoint = 'https://www.cheapshark.com/api/1.0/deals?pageSize=8&pageNumber='

export const dealHeadings = [
    "Title",
    "Savings",
    "Price",
    "Deal Rating"
]