import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import goTarget from '../assets/images/Union.png'
import Navigate from '../components/Navigate.js';
import './home.css';

function Home(props) {

    return (
        <div className="home__container">
        <div className='container'>
        <div >
        <div className="home">
            <img src={bgImage} alt="bg_image" className="image__home"/>
        </div>

          
        </div>
        </div>
        <div className="home__footer">
            <h1>Company</h1>
            <h1>Contact us</h1>
            <h1>Join us</h1>
        </div>
        </div>
    );
}

export default Home;