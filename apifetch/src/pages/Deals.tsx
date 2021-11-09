
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {VscLoading} from 'react-icons/vsc';
import {BsArrowLeft, BsArrowRight} from 'react-icons/bs'
import { dealsList, dealEndPoint, dealHeadings } from '../models/deals.models'
import StoreIcons  from '../components/storeIcons'
import { fetchData } from '../helpers'
import Table from '../components/table'
import "../App.css";

const StyledButtons = styled.div`
    button{
        display:block
        margin: 0 auto;
        margin-left: 500px
    }
`;

const Deals = () => {
    const [deals, setDeals] = useState<dealsList>([])
    const [error, setError] = useState<null | Error>()
    const [isLoading, setLoading] = useState(true)
    const [pageNumber, setPageNumber] = useState(0)
    const [check, setCheck] = useState(false)
    useEffect(() => {
        let fetchURL = check ? dealEndPoint + pageNumber + "&onSale=1" : dealEndPoint + pageNumber
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
            <br/>
            <>Filters: On Sale<input type="checkbox" onChange={() => setCheck(!check)}/></>
            {
                error ? <p>Fetch Error</p> :
                isLoading ? <VscLoading/> :             
                <Table data={deals.map(({thumb, title, savings ,salePrice, normalPrice, dealRating}) => ({thumb, title, savings ,salePrice, normalPrice, dealRating}))} headings={dealHeadings}/>
            }
            <StyledButtons>
                <button onClick={() => {
                setPageNumber(pageNumber - 1);
                setLoading(true);
                }}> 
                    <BsArrowLeft/>
                    Prev
                </button>
                <button onClick={() => {
                setPageNumber(pageNumber + 1);
                setLoading(true);
                }}> 
                    Next
                    <BsArrowRight/>
                </button>
            </StyledButtons>
        </div>
    )
}

export default Deals;