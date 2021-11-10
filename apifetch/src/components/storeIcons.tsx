import React, { useState, useEffect } from 'react'
import {storeList, storeEndPoint} from "../models/store.models"
import { fetchData } from '../helpers'
import "../App.css"

const Stores = () => {
    const [stores, setStores] = useState<storeList>([]);
    const [error, setError] = useState<null | Error>()

    useEffect(() => {
        fetchData<storeList>(storeEndPoint).then(x => {
            if(Array.isArray(x)){
                setStores(x.filter(x => x.isActive))
                setError(null)
            }
            else setError(x)
        });            
    }, [])

    return(
        <>
            {
                // lets make this a bit more helpful "And error occured loading icons" or something
               error ? <p>Oops an error has occured please try again</p> :
               stores.map((store) => (
                  <img key={store.storeID} className='storeBanner' alt = "banner" src={"https://www.cheapshark.com" + store.images.icon}
                  />
               ))
               
            }
        </>
    )
}
export default Stores;