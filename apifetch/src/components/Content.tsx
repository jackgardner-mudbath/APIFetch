import React, { useState, useEffect } from 'react'
import { FaSpinner } from "react-icons/fa";
import "../App.css"

//Store types
type Store = {
    id: number
    name: string
    images: {}
}

type storeList = {
    Stores: Store[]
}

function Content(){
    const [stores, setStores] = useState<storeList>({Stores: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://www.cheapshark.com/api/1.0/stores')
            .then(resp =>{
                if(resp.ok) {
                    return resp.json();
                }
                throw resp;
            })
            .then(data => {
                //console.log(data);
                setStores(data);
            })
            .catch(error => {
                console.log("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])
    if(loading) return <FaSpinner/>
    if(error) return <div>Error!</div>
    return(
        <div>
            <h1>Top Deals by Store</h1>
            {console.log(stores)}
        </div>
    )
}

export default Content;