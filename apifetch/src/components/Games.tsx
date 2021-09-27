import React, { useState, useEffect } from 'react'
import "../App.css"

type game = {
    cheapest: string
    cheapestDealID: string
    external: string
    gameID: string
    internalName: string
    steamAppID: string
    thumb: string
}

type gamesList = game[]

function Games(){
    const [games, setGames] = useState<gamesList>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.cheapshark.com/api/1.0/games?title=escapists');
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
            }
            //making json type storeList so we can filter out all inactive stores
            const json = await response.json();
            return json;
        }
        fetchData().then(json => {
            setGames(json);
        }).catch(error => {console.log(error.message)});
    }, [])
    return(
        <div>
            <h1>Games</h1>
            {
                games.map((game) => (
                    <div key={game.gameID}>
                        <p>{game.external}</p>
                        <img src={game.thumb}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Games;