import React from 'react'
import { gamesList} from '../models/games.models'
import { dealsList, dealHeadings } from '../models/deals.models'
import "../App.css"

//TODO: replace Object.keys with headings.map()

const Table = (props: { data: gamesList | dealsList, headings: string[]}) => {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(props.data[0] ?? {}).map((k) => (
              <th key={k}>{k}</th>
            ))}
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