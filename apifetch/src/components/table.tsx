import React from 'react'
import { gamesList} from '../models/games.models'
import { dealsList } from '../models/deals.models'
import "../App.css"

//TODO: replace Object.keys with headings.map()

const Table = (props: { data: gamesList | dealsList, headings: string[]}) => {
    return (
      <table>
        <thead>
          <tr>
            {props.headings.map((head, index) => (
              <th key={index}>{head}</th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(item).map((v) => (
                <td key={v}>{String(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  export default Table;