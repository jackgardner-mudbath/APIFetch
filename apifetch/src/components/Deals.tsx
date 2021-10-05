import React, { useState, useEffect } from 'react';
import {VscLoading} from 'react-icons/vsc';
import Favourite from '../components/Favourite';
import "../App.css";

export type deal = {
    dealID: string
    dealRating: string
    gameID: string
    internalName: string
    isOnSale: number
    lastChange: number
    metacriticLink: string
    metacriticScore: string
    normalPrice: string
    releaseDate: number
    salePrice: string
    savings: string
    steamAppID: string
    steamRatingCount: string
    steamRatingPercent: string
    steamRatingText: string
    storeID: string
    thumb: string
    title: string
}

type dealsList = deal[]

const redirectURL: string = "https://www.cheapshark.com/redirect?dealID=";

function Deals(){
    const [deals, setDeals] = useState<dealsList>([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://www.cheapshark.com/api/1.0/deals?');
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
            }
            const json = await response.json();
            return json;
        }
        fetchData().then(json => {
            setDeals(json);
            setLoading(false);
        }).catch(error => {console.log(error.message)});
    }, [])   
    return(
        <div>
            <h1>Deals</h1>
            {
                isLoading ? <VscLoading/> :             
                <table className="table-container">
                    <thead className="table-headers">
                        <tr>
                            <th>Title</th>
                            <th>Savings</th>
                            <th>Price</th>
                            <th>Deal Rating</th>
                            <th>Favourite</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {
                            deals.map(deal => (
                                <tr key={deal.dealID}>
                                    <td style={{textAlign: 'left'}}>
                                        <a href={redirectURL + deal.dealID} target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'black'}}>
                                            <img alt={deal.dealID} src={deal.thumb}/>{deal.title}
                                        </a>
                                    </td>
                                    <td>{Math.floor(parseInt(deal.savings))}%</td>
                                    <td>
                                        <span>{deal.salePrice}</span>
                                        <sup><del>{deal.normalPrice}</del></sup>
                                    </td>
                                    <td>{deal.dealRating}</td>
                                    <Favourite id={deal.dealID}/>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Deals;