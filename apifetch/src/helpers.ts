import { gamesList } from './models/games.models'
import { dealsList } from './models/deals.models'

export const fetchData = async (url: string)=> {
    const response = await fetch(url)
    if(!response.ok){
        console.log("Fetch error: ", response.status)
        //TODO: ask if this is whats best to be returned from this function
        return new Error("Fetch failed: " + response.status)
    }
    const json = await response.json()
    return json
}