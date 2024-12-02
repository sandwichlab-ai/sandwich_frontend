import { useState } from 'react';
import './card.scss';

function Card(props) {
    return (
        <div className="effect-card">
            <div className="name">{props.item.name}</div>
            <div className="status">-</div>
        </div>
    )
}

export default Card;