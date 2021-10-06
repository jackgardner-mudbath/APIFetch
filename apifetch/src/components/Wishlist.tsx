import React from 'react';
import "../App.css";

function Wishlist() {
    var favourites = [{}];
    const getFavourites = JSON.parse(localStorage.getItem('favourites') || "");
    for(var i = 0; i < getFavourites.length; i++)
    {
        let x = getFavourites[i];
        favourites[i] = JSON.parse(localStorage.getItem('favItem' + [x]) || '');
    }
    //const titles = Object.keys(favourites[0]);
    return(
        <div>
            <h1>Wishlist</h1>
            {favourites.map((items: any, i: number) => (
                    <div key={i}>
                        <p>{items}</p>
                    </div>
            ))}
        </div>
    )
}

export default Wishlist