import React from "react"
import './DocumentHeader.scss'

import logoNew from '../../assets/logoNew.png'
import { useNavigate } from "react-router-dom"

export const DocumentHeader = () => {
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        navigate(e.target.id)
        window.scrollTo({
            top: 0,
        })
    }

    return (
        <header className="Header">
            <div className="HeaderPC">
                <div className="HeaderTop">
                    <img className='HeaderLogo NoMargin' src={logoNew} alt="WearPoizon" id="/" onClick={handleNavigate} />
                </div>
            </div>
            <div className="HeaderMobile CenteredHeader">
                <img className='HeaderLogo NoMargin' src={logoNew} alt="WearPoizon" id="/" onClick={handleNavigate} />
            </div>
        </header>
    )
}