
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
        /*
            Lets update this to use something called interpolation,
            The problem with the string concatination approach is that multiple strings need to be created
            and it can become a bit more difficult to read easiler

            Interpolation allows us to actually have one solid string, but we can include others by the use of ${}
            `${dealEndpoint}${pageNumber}&onSale=1`

            However, given we use the first two strings in the same order twice, how about you create a new string out of the above
            and interpolate it into one string
        */
        let fetchURL = check ? dealEndPoint + pageNumber + "&onSale=1" : dealEndPoint + pageNumber
        fetchData<dealsList>(fetchURL).then(x =>{
            /*
                As I said in the table component, how about we create a mapper function which is specific to deals\
                Then we can pass that returned result into the table and it can just handle rendering it as opposed 
                to mutatiting AND rendering the object            

                Should we not be utlizing the error checker thing that is in the deals.models.ts file?
                Lets also update so that the inverse is true
                The last line(s) of any method/file should always be the intention of that piece of code.
                In this case the last line is setting an error which is not what we came to do
            */

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
            {/* Fragments would not really be required here. Maybe put this in a `p` or something or just remove them entirely */}
            <>Filters: On Sale<input type="checkbox" onChange={() => setCheck(!check)}/></>
            {
                // You've put yourself in a position now where if you have an error, you will not be able to ever see a loading indicator
                error ? <p>Fetch Error</p> :
                isLoading ? <VscLoading/> :             
                <Table data={deals.map(({thumb, title, savings ,salePrice, normalPrice, dealRating}) => ({thumb, title, savings ,salePrice, normalPrice, dealRating}))} headings={dealHeadings}/>
            }
            {/* 
                Technically this is a wrapper. I would much prefer you make the buttons the `StyledButton` object/tag and revert this to a div
                even in the styled component, you reference the button children straight away. Would just make more sense to do the above 
            */}
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