// This is not a type, please update this to be an interface. 
// Remember a `type` is basically a collection of different items
// a nice shorthand way of writing `number | string` everywhere kind of thing
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

// This is correct use of type
export type dealsList = deal[]

/*
    this looks like the perfect place to utilize a generic typing

    How about instead of calling this "isDeal", we make it more generic and call it `isError`

    Then we can pass in type of T to it, we do not need to repeat this everywhere for each additional class we may add
*/
//Type guard for the custom interface/type above
export const isDeal = (d:any): d is deal => {
    return (d as deal) !== undefined
}

// Lets move this to an API file or something, lets keep the models file specificly for model related items

//URL for redirecting to the deal's store page
export const redirectURL = "https://www.cheapshark.com/redirect?dealID=";

export const dealEndPoint = 'https://www.cheapshark.com/api/1.0/deals?pageSize=8&pageNumber='

export const dealHeadings = [
    "",
    "Title",
    "Savings",
    "Sale Price",
    "Normal Price",
    "Deal Rating"
]