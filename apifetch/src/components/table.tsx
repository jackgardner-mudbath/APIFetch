import React from "react"
import "../App.css"

let priceRegex:RegExp = /\d{1,2}\.\d{2}/
let imgRegex:RegExp = /gif|jpe?g|png|JPG/
let savingsRegex:RegExp = /\d{2}\.\d{6}/

const renderHelper = (item: string) => {
  if(imgRegex.test(item))
  {
    return(
      <img alt="" src={item} 
       onError={e => {
         const target = e.target as HTMLImageElement;
         if(target)
          target.src = ""
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
    } else
    return(
      <>${item}</>
    )
  }
  else return <>{item}</>
}

const Table = (props: { data: {}[], headings: string[]}) => {
    return (
      <table>
        <thead>
          <tr>
            {props.headings.map((head, index) => (
              <th key={index}>{head}</th>
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
      </table>
    );
  };
  export default Table;