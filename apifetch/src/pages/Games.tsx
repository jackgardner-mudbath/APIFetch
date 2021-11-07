import { useState, useEffect, useRef } from 'react'
import { MdSearch } from 'react-icons/md';
import { gamesList,endpoint, gameHeadings  } from '../models/games.models'
import Table from '../components/table'
import "../App.css"


const Games = (props?: {navInput:string}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [games, setGames] = useState<gamesList>([]);
    const [btnPress, setBtnPress] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            let url = endpoint + inputRef.current!.value;
            const response = await fetch(url);
            //Error handling for fetch()
            if(!response.ok){
                console.log("An error has occured" + response.status)
                return new Error("An error has occured" + response.status)
            }
            const json = await response.json()
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
                <input placeholder="Search..." type="text" ref={inputRef} onKeyPress={(e) =>{if(e.key === 'Enter') setBtnPress(!btnPress)}}/>
                <button onClick={() => setBtnPress(!btnPress)}><MdSearch/></button>
                <Table data={games} headings={gameHeadings}/>
                </div>
            }
        </div>
    )
}
export default Games;