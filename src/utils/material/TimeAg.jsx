import React from 'react'
import TimeAgo  from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

export const TimeAg = ({date}) => {
    const formatter = buildFormatter(frenchStrings)

    return (
        <>
            <TimeAgo date={date} formatter={formatter} />
        </>
    )
}
