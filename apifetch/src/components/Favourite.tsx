import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart} from "react-icons/fa";
import deal from "../components/Deals";
import "../App.css";

/**
 * TODO:
 *  function to write to json file
 *  function to read from json file
 */


function Favourite(){
    const [favourite, setFavourite] = useState(false);
    return(
        <td className="fave-container">
            <button className="fave-button" onClick={()=> setFavourite(!favourite)}>
            {
                favourite ? <FaHeart/> :  <FaRegHeart/>
            }
            </button>
        </td>
    )
}

export default Favourite