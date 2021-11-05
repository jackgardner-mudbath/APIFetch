import { useState, useEffect, useRef } from 'react'
import { MdSearch } from 'react-icons/md';
import { gamesList } from '../models/games.models'
import "../App.css"


const gamesEP = 'https://www.cheapshark.com/api/1.0/games?title=';

const Games = (props?: {navInput:string}) => {
    const [games, setGames] = useState<gamesList>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [btnPress, setBtnPress] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            let url = gamesEP + inputRef.current!.value;
            console.log(url);
            const response = await fetch(url);
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
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
               // error.current ? (error.current = false, <p>Oops your search could not be completed, try again later</p>) :
                <div className="search-wrapper">
                <input placeholder="Search..." type="text" ref={inputRef}/>
                <button onClick={() => setBtnPress(!btnPress)}><MdSearch/></button>
                {
                    games.map((game) => (
                            <span>
                                <p key={game.gameID}>{game.external}</p>
                                <img src={game.thumb}/>
                            </span>
                    ))
                }
                </div>
            }
        </div>
    )
}

export default Games;