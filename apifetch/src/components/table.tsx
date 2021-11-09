import React, { useState } from "react"
import styled from 'styled-components'
import "../App.css"

let priceRegex:RegExp = /\d{1,2}\.\d{2}/
let imgRegex:RegExp = /gif|jpe?g|png|JPG/
let savingsRegex:RegExp = /\d{2}\.\d{6}/
//let storeIDRegex:RegExp = /\d{3,6}/

const renderHelper = (item: string) => {
  //the storeID from the Games API endpoint can sometimes be null
  if(item === "null") {return <></>}
  if(imgRegex.test(item))
  {
    return(
      <img alt="" src={item} 
       onError={e => {
         const target = e.target as HTMLImageElement;
         if(target)
          target.src = ""
          target.style.display='none'
       }}
      style={{height: '60px', minHeight: '100%', background: 'no-repeat center center', backgroundSize: 'contain'}}/>
    )
  }
  //Nesting these together because I do not have time to refine the regexes
  else if(priceRegex.test(item))
  {
    if(savingsRegex.test(item))
    {
      return(
        <>
          {Math.floor(parseInt(item))}%
        </>
      )
    }
    else
    return(
      <>${item}</>
    )
  }
  else return <>{item}</>
}

const StyledTable = styled.table`
text-align: center;
margin-left: auto;
margin-right: auto;
border-collapse: collapse;
border-spacing:10px ;
img{
    height: 39px;
    width: 102px;
    background-repeat: no-repeat;
    background-position: top;
    -moz-background-size: contain;
    -o-background-size: contain;
    -webkit-background-size: contain;
    background-size: contain;
    background-color: #13171e;
    border: 1px solid #123;
    -webkit-box-shadow: 3px 3px 5px #151515;
    box-shadow: 3px 3px 5px #151515;
    float: left;
    margin-right: 10px;
}
td{
  border-bottom: 1px solid #4d4b4b;
}
th{
  padding: 10px;
}
`;

const sortTypes = {
  asc: {
    fn: (a:any,b:any) => a - b
  },
  desc:{
    fn:(a:any,b:any) => b-a
  },
  default: {
    fn:(a:any,b:any) => a
  }
}

const Table = (props: { data: {}[], headings: string[]}) => {
    const [currentSort, setCurrentSort] = useState(sortTypes.default)
    const headingOnClick = () => {
        let nextSort = sortTypes.default
        if(currentSort === sortTypes.desc) nextSort = sortTypes.asc
        else if(currentSort === sortTypes.asc) nextSort = sortTypes.default
        else if(currentSort === sortTypes.default) nextSort = sortTypes.desc
        setCurrentSort(nextSort)
    }
    return (
      <StyledTable>
        <thead>
          <tr>
            {props.headings.map((head, index) => (
              <th onClick={() => {headingOnClick()}} key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {props.data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(item).map((v, index) => (
                <td key={index}>
                  {
                    renderHelper(String(v))
                  }
                  </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    );
  };
  export default Table;