import React, {useState, useRef} from 'react'
import { MdMenu, MdSearch } from 'react-icons/md';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import { Links } from '../models/links.models'
import "../App.css"

const Navbar = () => {    
    const inputRef = useRef<HTMLInputElement>(null);
    const [showLinks, setShowLinks] = useState(false);
    const history = useHistory()
    const { pathname } = useLocation()
    const searchBarHandler = () => {
        history.push({
            pathname: Links.Search,
            state: inputRef.current!.value,
        })
        inputRef.current!.value = ""
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
                    <NavLink exact to={{pathname: Links.Search, state: ""}} activeClassName="activeLink"  style={{textDecoration: 'none'}}>
                        <li>Search</li>
                    </NavLink>
                    {/* <NavLink exact to={Links.Wishlist} activeClassName="activeLink" style={{textDecoration: 'none'}}>
                        <li>Wishlist</li>
                    </NavLink> */}
                </ul>
                <button onClick={()=> setShowLinks(!showLinks)}><MdMenu/></button>
            </div>
            {
                pathname !== '/games' &&
                <div className="rightSide">
                    <input placeholder="Search..." type="text" ref={inputRef} onKeyPress={(e) =>{if(e.key === 'Enter') searchBarHandler()}}/>
                    <button onClick={() => {searchBarHandler()}}><MdSearch/></button>
                </div>
            }
        </nav>
    )
}
export default Navbar