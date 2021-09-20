import React, { useState, useEffect } from 'react'
//import { FaSpinner } from "react-icons/fa";
import "../App.css"

// //Store types
type Store = {
    storeID: number
    storeName: string
    isActive: boolean
    images: {}
}

type storeList = Store[]

// type Deal = {
//     internalName: string
//     title: string
//     dealID: string
//     storeID: number
// }

function Content(){
    const [stores, setStores] = useState<storeList>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://www.cheapshark.com/api/1.0/stores');
            //making json type storeList so we can filter out all inactive stores
            const json: storeList = await data.json();
            //Filter out all inactive stores i.e isActive = 0
            setStores(json.filter(x => x.isActive));
            const dealData = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=10')
            const dealJSON = await dealData.json();
            console.log(dealJSON);
        }
        fetchData()
        .catch(console.error);
    }, [])

    return(
        <div>
            <h1>Top Deals by Store</h1>
            {
               stores.map((store) => (
                   <div key={store.storeID}>
                       <p>{store.storeName}</p>
                   </div>
               ))
            }  
        </div>
    )
}
export default Content;