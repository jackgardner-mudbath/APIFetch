import React, { useState, useEffect } from 'react';
import "../App.css";

const Wishlist = () => {
    const [storage, setStorage] = useState([])
    useEffect(() => {
        const saved = localStorage.getItem("favourites") || ""
        const value = JSON.parse(saved)
        setStorage(value)
    }, [storage])
    return(
        <div>
            <h1>Wishlist</h1>
            {storage.map((items: any, i: number) => (
                    <div key={i}>
                        <p>{items}</p>
                    </div>
            ))}
        </div>
    )
}

export default Wishlist