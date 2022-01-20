import React from 'react'

function ActiveLink({title}) {
    return (
        <>
            <li class="breadcrumb-item active">{title}</li>
        </>
    )
}

export default ActiveLink
