import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import image from '../assets/images/logo.png'

function Navigate(props) {

    const [naviState, setNaviState] = useState(0);

    useEffect(() => {
        console.log("666 is small window changed")
    }, [props.isSamllWindow])

    const navigate = useNavigate();

    const renderText = "Home"

    return (
        <div className="header">

            <div className="header__left" onClick={() => {
                navigate("/");
                setNaviState(0)
            }}>
                <img src={image} width="64" height="48" />
            </div>
            <div className="header__btn--group">
                <span
                    onClick={() => props.setIsHome(true)}
                    style={{
                        color: props.isHome ? '#8C68FF' : '#999999',
                        fontWeight: props.isHome ? 700 : 500
                    }}
                    // className = {props.isHome? 'selected' : 'remain'}
                    className={`selected ${props.isHome ? 'active' : ''}`}
                >{renderText}</span>
                <span className="gap"></span>
                <span
                    onClick={() => props.setIsHome(false)}
                    style={{
                        color: props.isHome ? '#999999' : '#8C68FF',
                        fontWeight: props.isHome ? 500 : 700
                    }}
                    // className = {props.isHome? 'remain' : 'selected'}
                    className={`remain ${props.isHome ? '' : 'active'}`}
                >Contact Us</span>
            </div>
            <div className="header__right">Sandwich Lab AI HK Limited</div>
        </div>
    )
}

export default Navigate;