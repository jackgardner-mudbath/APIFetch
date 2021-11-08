export interface Store {
    storeID: number
    storeName: string
    isActive: boolean
    images: {
        banner: string
        icon: string
        logo: string
    }
}

export type storeList = Store[]

export const storeEndPoint = 'https://www.cheapshark.com/api/1.0/stores'