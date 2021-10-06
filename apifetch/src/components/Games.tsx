import React, { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md';
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

const gamesEP = 'https://www.cheapshark.com/api/1.0/games?title=';

function updateInput(){
    
}

function Games(){
    const [games, setGames] = useState<gamesList>([]);
    const [input, setInput] = useState<string>();
    const [error, setError] = useState<boolean>();
    const [failCount, setFailCount] = useState(100);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(gamesEP + input);
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
            }
            //making json type storeList so we can filter out all inactive stores
            const json = await response.json();
            setFailCount(failCount => failCount-1);
            if(failCount === 0)
            {
                setFailCount(10);
                throw new Error("forced API to fail");
            }
            else return json;
        }
        fetchData().then(json => {
            setGames(json);
        }).catch(error => 
            {
                setError(true);
                console.log(error.message)
            });
    }, [input])
    return(
        <div>
            <h1>Games</h1>
            {
                error ? <p>Error your search request could not be completed, please try again</p> :
                <div className="search-wrapper">
                <input placeholder="Search..." type="text" value={input}
                onChange={e => setInput(e.target.value)} />
                <button><MdSearch/></button>
                {
                    games.map((game) => (
                            <p key={game.gameID}>{game.external}</p>
                    ))
                }
                </div>
            }
        </div>
    )
}

export default Games;