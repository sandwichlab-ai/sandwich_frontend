import React, {useState} from 'react';
import image from '../assets/images/logosandwich.png';
import Profile from "../assets/images/user.png"
import Ads from "../assets/images/ads.png"
import Creative from "../assets/images/creative.png"
import Setting from "../assets/images/setting.png"
import './sidebar.css'

function Sidebar() {

    const [options, setOptions] = useState(["Profile", "Ad Projects", "Creatives", "Settings"])
    const [optslogo, setOptslogo] = useState([Profile, Ads, Creative, Setting]) 

    return (
        <div className="profile__sidebar--container">
            <img src={image}/>
           
            <div className="profile__sidebar--content">
                {
                    options.map((el, index) => {
                        return (
                         <div> 
                           <img src={optslogo[index]}/>  <span>{el}</span>
                          </div>
                       )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar;