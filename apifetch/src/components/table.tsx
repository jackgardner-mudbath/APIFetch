import React, { useState } from "react"
import styled from 'styled-components'
import "../App.css"

let priceRegex:RegExp = /\d{1,2}\.\d{2}/
let imgRegex:RegExp = /gif|jpe?g|png|JPG/
let savingsRegex:RegExp = /\d{2}\.\d{6}/
//let storeIDRegex:RegExp = /\d{3,6}/


/* 
  This should not exist inside of the table, you are now locking this table down to only being able to be used 
  to render sales and prices. There this be some kind of mapper on each of the places that use it, then the returned
  value from that object should be what is passed into this table component to be rendered

  It should be as "dumb" as possible. Basically give it data and it renders data

*/
const renderHelper = (item: string) => {
  //the storeID from the Games API endpoint can sometimes be null
  if(item === "null") {return <></>}
  if(imgRegex.test(item))
  {
    // This could be put inside of a Styled Component and do away with the styles prop
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
  /*
    Not sure exactly what this comment means. 

    If the above is true (regex is satisified), then it will return an image anyway
    you do not need to chain (nest) these together, you've also got a few duplicate return statements

    The other thing I want to you do is not worry about nested if statements.
    It a million times easier to read down a page than it is left to right.


    ```
      const isPrice = priceRegex.test(item);
      const isSavings = savingsRegex.test(item)

      if(isPrice && isSavings) {
        return <>{Math.floor(parseInt(item))}%</>
      )

      if(isPrice && !isSavings) {
        return <>${item}</>
      }

      return <>{item}</>
    ```
  */
  
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


// The img in this table should be in it's own styled component, just form a cleanliness perspective
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

/* 
  The way the props are made available is very complicated, although is correct and does work, it's not very clean
  A better way to handle it would be this

  ```
    interface TableProps {
      data: any[],
      headings: string[]
    }

    const Table = ({ data, heading }: TableProps) => ...
  ```

  Type safety still exists and we do not need to create any object decorations inline. Overall making for a cleaner experience
  Also notice the `any[]` as opposed to a `{}[]`. any has the implication that ANYTHING can go there, using a {} has the implication
  that the only thing that can go there is an empty object
*/

const Table = (props: { data: {}[], headings: string[]}) => {
    const [currentSort, setCurrentSort] = useState(sortTypes.default)
    const headingOnClick = () => {
      // A switch statement would be more memory efficient here
      // If the user goes back to a default sorting order, both the previous blocks get evaluated
      
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