import React, { useState, useEffect } from 'react'
import { FaSpinner } from "react-icons/fa";
import "../App.css"

//Store types
type Store = {
    id: number
    name: string
    isActive: boolean
    images: {}
}

// type storeList = {
//     Stores: Store[]
// }

function Content(){
    const [stores, setStores] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () =>{
            const data = await fetch('https://www.cheapshark.com/api/1.0/stores');
            const json = await data.json();
            setStores(json);
        }
        fetchData()
        .catch(console.error);
        // fetch('https://www.cheapshark.com/api/1.0/stores')
            // .then(resp =>{
            //     if(resp.ok) {
            //         return resp.json();
            //     }
            //     throw resp;
            // })
            // .then(data => {
            //     console.log(data);
            //     setStores(data);
            // })
            // .catch(error => {
            //     console.log("Error fetching data: ", error);
            //     setError(error);
            // })
            // .finally(() => {
            //     setLoading(false);
            // })
    }, [])
    // if (loading) {
    //     return <p>Data is loading... <FaSpinner/></p>;
    //     setLoading(false);
    // stores.map(s => {
    //     console.log(s)
    // })
    // }
    return(
        <div>
            <h1>Top Deals by Store</h1> 
            {
               stores.map((s : any) => {
                    <p key={s.storeID}>{s}</p>
               })
                
            }
        </div>
    )
}

export default Content;