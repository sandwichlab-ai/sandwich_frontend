import { useEffect, useState } from 'react';
import Contact from './Contact';
import Home from './Home';
import Navigate from '../../components/navigate';
import './index.css';

function HomePage() {
  const [isHome, setIsHome] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSamllWindow, setIsSamllWindow] = useState(false);

  useEffect(() => {
    console.log('window size', window.innerWidth, window.innerHeight);
  }, [isHome]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log('window with changed');
    if (windowWidth < 810) {
      console.log('narrow mode triggered');
      setIsSamllWindow(true);
    } else {
      setIsSamllWindow(false);
      console.log('wide mode triggered');
    }
  }, [windowWidth]);

  return (
    <div className='wrapper'>
      <Navigate
        isHome={isHome}
        isSamllWindow={isSamllWindow}
        setIsHome={setIsHome}
      />
      {isHome ? (
        <Home isHome={isHome} setIsHome={setIsHome} />
      ) : (
        <Contact
          isHome={isHome}
          setIsHome={setIsHome}
          isSamllWindow={isSamllWindow}
        />
      )}
    </div>
  );
}

export default HomePage;
