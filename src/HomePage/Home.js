import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import goTarget from '../assets/images/Union.png'
import './home.css';

function Home() {

    return (
        <div className="home">
            <img src={bgImage} alt="bg_image" className="image__home"/>
            <div>
                <span className="home__join--us">Join US</span>
                <span 
                    className="home__go"
                    onClick={() => {
                        window.open('https://www.google.com', '_blank');
                    }}
                >
                    <img src={goTarget} alt="goto_target"/>
                </span>
            </div>
        </div>
    );
}

export default Home;