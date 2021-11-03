import { useState, useEffect } from 'react';
import {VscLoading} from 'react-icons/vsc';
import Favourite from '../pages/Favourite';
import { dealsList } from '../models/deals.models'
import "../App.css";

const redirectURL: string = "https://www.cheapshark.com/redirect?dealID=";

const Deals = () => {
    const [deals, setDeals] = useState<dealsList>([]);
    const [isLoading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            console.log(pageNumber);
            let fetchURL = 'https://www.cheapshark.com/api/1.0/deals?pageSize=8&pageNumber=' + pageNumber;
            const response = await fetch(fetchURL);
            //Error handling for fetch()
            if(!response.ok){
                const message = "An error has occured" + response.status;
                throw new Error(message)
            }
            const json = await response.json().catch(error => {
                console.log(error.message);
            });
            setDeals(json);
            setLoading(false);
        }
        fetchData();
    }, [pageNumber])   
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
                                    <Favourite data={deal}/>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
            <span>
                <button onClick={() => {
                setPageNumber(pageNumber - 1);
                setLoading(true);
                }}> 
                    Prev
                </button>
                <button onClick={() => {
                setPageNumber(pageNumber + 1);
                setLoading(true);
                }}> 
                    Next
                </button>
            </span>
        </div>
    )
}

export default Deals;