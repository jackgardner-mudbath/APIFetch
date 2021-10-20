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