import React, { useState, useEffect, useRef } from 'react'
import { MdSearch } from 'react-icons/md';
import { gamesList, listGamesEP, gameHeadings  } from '../models/games.models'
import { fetchData } from '../helpers'
import Table from '../components/table'
import StoreIcons  from '../components/storeIcons'
import "../App.css"

// Look to just pull location out
// ...  = ({ location }) => ...
const Games = (props:{location: {state:string}}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [games, setGames] = useState<gamesList>([]);
    const [btnPress, setBtnPress] = useState<boolean>(false);
    const [error, setError] = useState<null | Error>()
    const [count, setCount] = useState(0)
    // See below comment, this is not needed
    const [propsUsed, setPropsUsed] = useState(false)

    const searchBarHandler =() => {
        setBtnPress(!btnPress)
        setCount(count + 1)
        if(count === 10)
        {
            setCount(0)
            setError(new Error())
        }
        else {
            setError(null)
        }
    }

    useEffect (()  => {
        let fetchURL = listGamesEP
        // I don't fully see what exactly this is doing,
        // Part of me feels we do not need this, why do we only need a location once?
        // Also as per the Nav section, State is "" anyway so this doesn't add any value
        if(!propsUsed)
        {
            fetchURL += props.location.state
            setPropsUsed(true)
        }
        fetchURL += inputRef.current!.value
        fetchData<gamesList>(fetchURL).then(x => {
            if(Array.isArray(x)){
                setGames(x)
                //Commented code?
                //setError(null)
            }
            else setError(x)
        });
    }, [btnPress, count])

    return(
        <div>
            <h1>Games</h1>
            <StoreIcons/>
            {
                <div className="search-wrapper">
                    {/* Don't need fragments or the {} braces around the above div*/}
                    <>
                    {error && <p>Oops there was an error on our end, please try again</p>}
                        <input placeholder="Search..." type="text" ref={inputRef} onKeyPress={(e) =>{if(e.key === 'Enter') searchBarHandler()}}/>
                        <button onClick={() => searchBarHandler()}><MdSearch/></button>
                        <Table data={games.map(({thumb, external, steamAppID, cheapest }) => ({thumb, external, steamAppID, cheapest}))} 
                            headings={gameHeadings}/>  
                    </>
                </div>
            }
        </div>
    )
}
export default Games;