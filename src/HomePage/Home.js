import { useState } from 'react';
import bgImage from '../assets/images/bgImage.png';
import './home.css';

function Home() {

    return (
        <div className="home">
            <img src={bgImage} className="image__home"/>
        </div>
    );
}

export default Home;