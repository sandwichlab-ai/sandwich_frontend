import { useEffect, useState } from 'react';
import Contact from './Contact';
import Home from './Home';
import Navigate from '../components/Navigate.js';
import './index.css'; 

function HomePage() {

    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
      console.log("window size", window.innerWidth, window.innerHeight)
    }, [isHome])

    return (
        <div className="wrapper">
            {/* <div className = "header">

                <div className = "header__left">
                </div>


                <div className="header__btn--group">
                    <span 
                        onClick={() => setIsHome(true)}
                        style={{ 
                            color: isHome ? '#8C68FF' : '#999999'
                            
                        }}
                        className = {isHome? 'selected' : 'remain'}
                        >Home</span>
                    <span 
                        onClick={() => setIsHome(false)}
                        style={{ 
                            color: isHome ? '#999999' : '#8C68FF' 
                        }}
                        className = {isHome? 'remain' : 'selected'}
                        >Contact Us</span>
                </div>
              
            </div> */}
            {isHome? <Home isHome = {isHome} setIsHome = {setIsHome}/> : <Contact isHome = {isHome} setIsHome = {setIsHome}/>}
        </div>
    );
}

export default HomePage;