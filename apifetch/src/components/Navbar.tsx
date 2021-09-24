import React, {useState} from 'react'
import { MdMenu, MdSearch } from 'react-icons/md';
import {NavLink} from 'react-router-dom';
import "../App.css"

function Navbar() {
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
                    <NavLink exact to='/' activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink exact to='/games' activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Games</li>
                    </NavLink>
                    <NavLink exact to='/deals' activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Deals</li>
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