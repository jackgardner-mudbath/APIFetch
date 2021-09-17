import React, {useState} from 'react'
import { MdMenu, MdSearch } from "react-icons/md";
import "../App.css"

function Navbar() {
    const [showLinks, setShowLinks] = useState(false);
    return(
        <div className="Navbar">
            <div className="leftSide">
                <div className="links" id={showLinks ? "hidden" : ""}>
                    <a href="">Home</a>
                    <a href="/browse">Browse</a>
                    <a href="/search">Search</a>
                    <a href="/raffle">Giveaways</a>
                    <a href="/about">About</a>
                </div>
                <button onClick={()=> setShowLinks(!showLinks)}><MdMenu/></button>
            </div>
            <div className="rightSide">
                <input type="text" placeholder="Search..."/>
                <button><MdSearch/></button>
            </div>
        </div>
    )
}
export default Navbar