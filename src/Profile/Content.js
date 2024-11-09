import React, {useState} from 'react';
import "./content.css"

function Content() {
    return (
        <div className="content">
            <div className="content__bussiness">
                You and your Bussiness

                textarea
            </div>

            <div className="addtional__information">
                <span className='addtional__information--title'>Additional information</span>
                <label>Link to your website</label>
                <input type="text"/>
            </div>

            <div className="account__connection">
                add account connection
            </div>

            <div className="content__btn--group">
                <button className="content__btn">
                    cancel
                </button>
                <button className="content__btn">
                    save
                </button>
            </div>
        </div>
    )
}

export default Content;