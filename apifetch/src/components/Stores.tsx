import React, { useState, useEffect } from 'react'
//import { FaSpinner } from "react-icons/fa";
import "../App.css"

//Types
type Store = {
    storeID: number
    storeName: string
    isActive: boolean
    images: {
        banner: string
        icon: string
        logo: string
    }
}
type storeList = Store[]

function Stores(){
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
            const json: storeList = await response.json();
            return json;
        }
        fetchData().then(json => {
            setStores(json.filter(x => x.isActive));
        }).catch(error => {console.log(error.message)});
    }, [])

    return(
        <div>
            <h1>Stores</h1>
            {
               stores.map((store) => (
                  <img key={store.storeID} className="storeBanner" alt = "banner" src={"https://www.cheapshark.com" + store.images.banner}/>
               ))
            }
        </div>
    )
}
export default Stores;