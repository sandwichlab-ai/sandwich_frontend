import React from 'react';
import bgImage from '../assets/images/bgImage.png';
import goTarget from '../assets/images/Union.png'
import footer from '../assets/images/footer.png'
import Navigate from '../components/Navigate.js';
import './home.css';

function Home(props) {

    return (
        <div className="home__container">
        <div className='container'>
        <div >
        <div className="home">
            <img src={bgImage} alt="bg_image" className="image__home"/>
            <div>
                <span className="home__join--us">Join US</span>
                <span 
                    className="home__go"
                    onClick={() => {
                        window.open('https://app.mokahr.com/social-recruitment/sandwichlab/140350', '_blank');
                    }}
                >
                    <img src={goTarget} alt="goto_target"/>
                </span>
            </div>
        </div>

          
        </div>
        </div>
        {/* <div className="home__footer"> */}
            <img src={footer} className="home__logo"/>
        {/* </div> */}
        </div>
    );
}

export default Home;