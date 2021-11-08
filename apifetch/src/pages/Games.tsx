import { useState, useEffect, useRef } from 'react'
import { MdSearch } from 'react-icons/md';
import { gamesList,endpoint, gameHeadings  } from '../models/games.models'
import { fetchData } from '../helpers'
import Table from '../components/table'
import "../App.css"

const Games = (props?: {navInput:string}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [games, setGames] = useState<gamesList>([]);
    const [btnPress, setBtnPress] = useState<boolean>(false);
    const [error, setError] = useState<null | Error>()
    useEffect (()  => {
        let url = endpoint + inputRef.current!.value;
        fetchData<gamesList>(url).then(x => {
            if(Array.isArray(x)){
                setGames(x)
                setError(null)
            }
            else setError(x)
        });
        console.log(games)
    }, [btnPress])
    return(
        <div>
            <h1>Games</h1>
            {
                <div className="search-wrapper">
                    <input placeholder="Search..." type="text" ref={inputRef} onKeyPress={(e) =>{if(e.key === 'Enter') setBtnPress(!btnPress)}}/>
                    <button onClick={() => setBtnPress(!btnPress)}><MdSearch/></button>
                {
                    error ? <p>Fetch Error</p> : <Table data={games} headings={gameHeadings}/>                  
                }
                </div>
            }
        </div>
    )
}
export default Games;