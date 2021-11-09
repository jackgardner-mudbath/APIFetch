
import React, { useState, useEffect } from 'react';
import {VscLoading} from 'react-icons/vsc';
import { dealsList, dealEndPoint, dealHeadings } from '../models/deals.models'
import StoreIcons  from '../components/storeIcons'
import { fetchData } from '../helpers'
import Table from '../components/table'
import "../App.css";

const Deals = () => {
    const [deals, setDeals] = useState<dealsList>([])
    const [error, setError] = useState<null | Error>()
    const [isLoading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [check, setCheck] = useState(false)
    useEffect(() => {
        let fetchURL = check ? dealEndPoint + pageNumber + "&onSale=1" : dealEndPoint + pageNumber
        console.log(fetchURL)
        fetchData<dealsList>(fetchURL).then(x =>{
            if(Array.isArray(x))
            {
                setDeals(x)
                setLoading(false)
                setError(null)
            }
            else setError(x)
        })
    }, [pageNumber, check])   

    return(
        <div>
            <h1>Deals</h1>
            <StoreIcons/>
            <>On Sale</><input type="checkbox" onChange={() => setCheck(!check)}/>
            {
                error ? <p>Fetch Error</p> :
                isLoading ? <VscLoading/> :             
                <Table data={deals.map(({thumb, title,savings ,salePrice, normalPrice, dealRating}) => ({thumb, title, savings ,salePrice, normalPrice, dealRating}))} headings={dealHeadings}/>
            }
            <>
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
            </>
        </div>
    )
}

export default Deals;