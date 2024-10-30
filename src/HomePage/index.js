import { useEffect, useState } from 'react';
import Contact from './Contact';
import Home from './Home';
import './index.css';
import bgImage from '../resources/bgImage.jpeg'; 

function HomePage() {

    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
      
    }, [isHome])

    return (
        <div className = "container">
            <div className = "header">

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
            </div>
            {isHome? <Home /> : <Contact />}
        </div>
    );
}

export default HomePage;