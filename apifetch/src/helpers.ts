import { game, isGame } from './models/games.models'
import { deal, isDeal } from './models/deals.models'

export const fetchData = async <T>(url: string): Promise<T | Error> => {
    const response = await fetch(url)
    if(!response.ok){
        console.log("Fetch error: ", response.status)
        return new Error("Fetch failed: " + response.status)
    }
    const json: T = await response.json()
    return json
}

export const tableHelper = (item: game | deal) => {
    if(isGame(item))
    {
        return renderGame(item);
    }
    else if (isDeal(item))
    {
        return renderDeal(item)
    }
}

const renderGame = (object : game) => {

}

const renderDeal = (object : deal) => {

}