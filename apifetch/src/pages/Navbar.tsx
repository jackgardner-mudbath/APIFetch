import React, {useState} from 'react'
import { MdMenu, MdSearch } from 'react-icons/md';
import {NavLink} from 'react-router-dom';
import { Links } from '../models/links.models'
import "../App.css"

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const updateState = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    }
    const sendInput = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log(inputValue);
    }
    return(
        <nav className="Navbar">
            <div className="leftSide">
                <ul className="links" id={showLinks ? "hidden" : ""}>
                    <NavLink exact to={Links.Home} activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink exact to={Links.Deals} activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Deals</li>
                    </NavLink>
                    <NavLink exact to={Links.Search} activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Search</li>
                    </NavLink>
                    <NavLink exact to={Links.Wishlist} activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Wishlist</li>
                    </NavLink>
                </ul>
                <button onClick={()=> setShowLinks(!showLinks)}><MdMenu/></button>
            </div>
            <div className="rightSide">
                <input onChange={updateState}type="text" placeholder="Search..."/>
                <button onClick={sendInput}><MdSearch/></button>
            </div>
        </nav>
    )
}
export default Navbar