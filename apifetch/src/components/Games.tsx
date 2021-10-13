import React, { useState, useEffect, useRef } from 'react'
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

const Games = (navInput?:string) => {
    const [games, setGames] = useState<gamesList>([]);
    const [input, setInput] = useState<string>();
    const [btnPress, setBtnPress] = useState<boolean>(false);
    let failCount = useRef<number>(0);
    let error = useRef<boolean>(false);
    const handleBtnPress = (evt: React.MouseEvent<HTMLButtonElement>): void => {
        setBtnPress(!btnPress);
    }
    //TODO could make it so useEffect does not run on intial render using useRef, so that the user does not see UNDEFINED
    //          and Touhou Seirensen Undefined Fantastic Object when they visit the page
    useEffect(() => {
        const fetchData = async () => {
            failCount.current++;
            //if the user has used the search bar in the nav bar use that value for the fetch request
            let url = (typeof navInput === "string") ? gamesEP + navInput : gamesEP + input;
            const response = await fetch(gamesEP + input);
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
            }
            if(failCount.current === 2)
            {
                error.current = true;
                failCount.current = 0;
                //const msg = "Forced API to fail";
                //throw new Error(msg);
            }
            const json = await response.json().catch(error => {
                console.log(error.message);
            });
            setGames(json);
        }
        fetchData();
    }, [btnPress])
    return(
        <div>
            <h1>Games</h1>
            {
                error.current ? (error.current = false, <p>Oops your search could not be completed, try again later</p>) :
                <div className="search-wrapper">
                <input placeholder="Search..." type="text" value={input} onChange={e => setInput(e.target.value)}/>
                <button onClick={e => handleBtnPress(e)}><MdSearch/></button>
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