import React from 'react'

function NameOfDay({date}) {
    let weekday = new Date(date).toLocaleString("fr-FR", { weekday: "short" })
    let today = new Date(date);
    return (
        
        <td className={weekday == "sam." ? "bg-warning text-white text-uppercase":"text-uppercase"}>

            {weekday} {today.getDate()} 
        </td>
    )
}

export default NameOfDay
