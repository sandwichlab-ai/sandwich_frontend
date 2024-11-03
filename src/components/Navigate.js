import React from "react";

function Navigate(props) {
    return (
<div className = "header">

<div className = "header__left">
</div>
        <div className="header__btn--group">
                    <span 
                        onClick={() => props.setIsHome(true)}
                        style={{ 
                            color: props.isHome ? '#8C68FF' : '#999999'
                            
                        }}
                        className = {props.isHome? 'selected' : 'remain'}
                        >Home</span>
                    <span 
                        onClick={() => props.setIsHome(false)}
                        style={{ 
                            color: props.isHome ? '#999999' : '#8C68FF' 
                        }}
                        className = {props.isHome? 'remain' : 'selected'}
                        >Contact Us</span>
                </div>
                </div>
    )
}

export default Navigate;