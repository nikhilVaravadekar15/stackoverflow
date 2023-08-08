import React from 'react'

export default function Loader() {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export function LoadingSpinner() {
    return (
        <div className="spin"></div>
    )
}
