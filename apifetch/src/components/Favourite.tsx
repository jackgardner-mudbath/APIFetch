import React, { useState, useEffect } from 'react';
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";
import "../App.css";

const Favourite = (props: {data: {}}) => {
    const [favourites, setFavourites] = useState<{}[]>([{}]);
    const getFavourites = JSON.parse(localStorage.getItem('favourites') || "");

    useEffect(() => {
        // if(getFavourites !== "")
        // {
        //     setFavourites([...getFavourites]);
        // }
    }, []);

    const addFav = (data: {}) => {
        let addArr = true;
        //TODO: change map to a some, return true if something was removed
        favourites.map((item, key) => {
            if(item === data)
            {
                favourites.splice(key, 1);
                addArr = false;
            }
        });
        if(addArr)
        {
            favourites.push(data);
        }
        setFavourites([...favourites]);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        let storage = localStorage.getItem('favItem' + (data) || "");
        (storage === null) ? localStorage.setItem(('favItem' + (data)), JSON.stringify(data)) 
                           : localStorage.removeItem('favItem' + (data));
    }
    return(
        <td className="fave-container">
            {
                favourites.includes(props.data) ? 
                <IoIosHeart className="fave-button" onClick={() => addFav(props.data)}/> :
                <IoIosHeartEmpty className="fave-button" onClick={() => addFav(props.data)}/>
            }
        </td>
    )
}

export default Favourite