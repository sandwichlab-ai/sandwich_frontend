import { useState } from 'react';
import editImg from '../../../../assets/images/edit.svg'
import "./addCard.scss"

function AddCard(props) {
    return (
        <div className="add-card">
            <div>{props.first}</div>
            <div>{`${props.second} `} <img src={editImg} alt="Logo" width="20" height="20" /></div>

        </div>
    )
}

export default AddCard;