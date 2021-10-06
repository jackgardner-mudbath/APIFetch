import React, { useState, useEffect } from 'react';
import {IoIosHeart, IoIosHeartEmpty} from "react-icons/io";
import "../App.css";

/**
 * TODO:
 *  function to write to json file
 *  function to read from json file
 */

function Favourite(props: {data: {dealID: string}}){
    const [favourites, setFavourites] = useState([] as Array<{dealID: string}>);
    const getFavourites = JSON.parse(localStorage.getItem('favourites') || "");

    useEffect(() => {
        if(getFavourites !== "")
        {
            setFavourites([...getFavourites]);
        }
    }, []);

    const addFav = (data: {dealID:string}) => {
        let addArr = true;
        //TODO: change map to a some, return true if something was removed
        favourites.map((item, key) => {
            if(item.dealID === data.dealID)
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
        let storage = localStorage.getItem('favItem' + (data.dealID) || "");
        if(storage === null)
        {
            localStorage.setItem(('favItem' + (data.dealID)), JSON.stringify(data));
        } 
        else
        {
            localStorage.removeItem('favItem' + (data.dealID));
        }

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