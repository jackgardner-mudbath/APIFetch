import React, { useState, useEffect } from 'react'
import {storeList} from "../models/store.models"
import "../App.css"

const Stores = () => {
    const [stores, setStores] = useState<storeList>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.cheapshark.com/api/1.0/stores');
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
            }
            //making json type storeList so we can filter out all inactive stores
            const json: storeList = await response.json().catch(error => {
                console.log(error.message);
            });
            setStores(json.filter(x => x.isActive));
        }
        fetchData();
    }, [])

    return(
        <div>
            <h1>Stores</h1>
            {
               stores.map((store) => (
                  <img key={store.storeID} className="storeBanner" alt = "banner" src={"https://www.cheapshark.com" + store.images.logo}/>
               ))
            }
        </div>
    )
}
export default Stores;