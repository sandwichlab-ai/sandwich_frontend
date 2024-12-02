import React, { useRef, useEffect } from 'react';
import bgImage from '../../assets/images/bgImage.png';
import goTarget from '../../assets/images/Union.png';
import footer from '../../assets/images/footer.png';
import Navigate from '../../components/navigate';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home(props) {
  const itemRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();

  const updatePosition = () => {
    const image = imageRef.current;
    const item = itemRef.current;
    console.log('el is: ', image, item);
    if (!image || !item) return;

    const imageRect = image.getBoundingClientRect();
    const itemWidth = item.clientWidth;
    const itemHeight = item.clientHeight;

    let left = imageRect.right - itemWidth - 64;
    let top = imageRect.top + imageRect.height * 0.75 - itemHeight / 2;

    console.log('left top: ', left, top);
    const maxRight = window.innerWidth - itemWidth - 5;
    if (left > maxRight) {
      left = maxRight;
    }

    left = Math.max(left, imageRect.left);

    console.log('current left top: ', left, top, window.innerWidth);
    if (window.innerWidth < 450) {
      left = left + 64;
    }
    item.style.left = `${left}px`;
    item.style.top = `${top}px`;
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div className='home__container'>
      <div className='container'>
        <div>
          <div className='home'>
            <img
              ref={imageRef}
              src={bgImage}
              alt='bg_imag'
              className='image__home'
            />
            <div ref={itemRef} className='home__joinus--container' onClick={() => {
              navigate('/auth', { state: { status: "register" } })
            }}>
              <span className='home__join--us'>Try for free now</span>
              <span
                className='home__go'
              // onClick={() => {
              //   window.open(
              //     'https://app.mokahr.com/social-recruitment/sandwichlab/140350',
              //     '_blank'
              //   );
              // }}
              >
                <img src={goTarget} alt='goto_target' />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="home__footer"> */}
      <img src={footer} className='home__logo' />
      {/* </div> */}

      <div className="home__footer">
        Copyright © 2024 Sandwich Lab AI HK Limited. All rights reserved.  <a>Terms and Conditions</a>  <a>Privacy Policy</a>
      </div>
    </div>
  );
}

export default Home;
