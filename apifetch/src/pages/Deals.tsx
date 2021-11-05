import { useState, useEffect, MouseEventHandler } from 'react';
import {VscLoading} from 'react-icons/vsc';
import {MdCheck, MdClose} from 'react-icons/md';
import Favourite from '../pages/Favourite';
import { redirectURL, dealsList } from '../models/deals.models'
import StoreIcons  from '../components/storeIcons'
import "../App.css";


//TODO: move this to deals.models.ts
const apiURL = 'https://www.cheapshark.com/api/1.0/deals?pageSize=8&pageNumber='

const Deals = () => {
    const [deals, setDeals] = useState<dealsList>([]);
    const [isLoading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [sortBy, setSortBy] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            let fetchURL = apiURL + pageNumber + sortBy
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
            <StoreIcons/>
            {
                isLoading ? <VscLoading/> :             
                <table className="table-container">
                    <thead className="table-headers">
                        <tr>
                            <th onClick={() => {
                                setSortBy('&sortBy=Title')
                                console.log(deals)
                            }}>
                            Title</th>
                            <th>Savings</th>
                            <th onClick={() => {
                                setSortBy("&sortBy=Price")
                                console.log(sortBy)
                            }}>Price</th>
                            <th>Deal Rating</th>
                            <th>Favourite</th>
                            <th onClick={() => {
                                setDeals(deals.sort((a, b) => a.isOnSale === 0 ? 1 : -1))
                                console.log(deals)
                            }}>On Sale</th>
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
                                    <td>{deal.isOnSale ? <MdCheck/> :<MdClose/> }</td>
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