
import React, { useState, useEffect } from 'react';
import {VscLoading} from 'react-icons/vsc';
import {MdCheck, MdClose} from 'react-icons/md';
import Favourite from '../pages/Favourite';
import { redirectURL, dealsList, dealEndPoint, dealHeadings } from '../models/deals.models'
import StoreIcons  from '../components/storeIcons'
import { fetchData } from '../helpers'
import Table from '../components/table'
import "../App.css";

//TODO: move this to deals.models.ts


const Deals = () => {
    const [deals, setDeals] = useState<dealsList>([]);
    const [error, setError] = useState<null | Error>()
    const [isLoading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        let fetchURL = dealEndPoint + pageNumber + sortBy
        fetchData<dealsList>(fetchURL).then(x =>{
            if(Array.isArray(x))
            {
                setDeals(x)
                setLoading(false)
                setError(null)
            }
            else setError(x)
        })
    }, [pageNumber])   

    return(
        <div>
            <h1>Deals</h1>
            <StoreIcons/>
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