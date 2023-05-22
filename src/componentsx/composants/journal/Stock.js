import React, { useEffect } from 'react';
export const Stock = ({ stock,stockInit,weekdayNumber }) => {
    return (
        <>

            <td className={stock==null ? "bg-dark text-white text-center" : 'bg-dark text-white text-center'}>
              {stock!=null ? stock : stockInit  }</td>
        </>
    )
}

export default Stock;
