import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/arrow.png';
import image from '../../assets/images/logo.png';

function Navigate(props) {
  const [naviState, setNaviState] = useState(0);

  useEffect(() => {
    console.log('666 is small window changed');
  }, [props.isSamllWindow]);

  const navigate = useNavigate();

  const renderText = 'Home';

  const rightSideStyle = {
    position: "absolute",
    top: "30px",
    cursor: "pointer",
    right: "32px",
    width: "466px",
    height: "48px",
    display: "flex",
    justifyContent: "space-between"
  }

  const LoginBtnStyle = {
    color: 'White',
    border: "1px solid white",
    height: "48px",
    width: "126px",
    borderRadius: "99px",
    backgroundColor: 'transparent',
  }

  const TryfreeBtnStyle = {
    color: '#8C68FF',
    border: "1px solid white",
    backgroundColor: "white",
    width: "320px",
    height: "48px",
    borderRadius: "79px",
    backgroundColor: 'white',
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontWeight: "bold"
  }
  const sig = '->'

  return (
    <div className='header'>
      <div
        className='header__left'
        onClick={() => {
          navigate('/');
          setNaviState(0);
        }}
      >
        <img src={image} width='64' height='48' />
      </div>
      <div className='header__btn--group'>
        <span
          onClick={() => props.setIsHome(true)}
          style={{
            color: props.isHome ? '#8C68FF' : '#999999',
            fontWeight: props.isHome ? 700 : 500,
          }}
          // className = {props.isHome? 'selected' : 'remain'}
          className={`selected ${props.isHome ? 'active' : ''}`}
        >
          {renderText}
        </span>
        <span className='gap'></span>
        <span
          onClick={() => props.setIsHome(false)}
          style={{
            color: props.isHome ? '#999999' : '#8C68FF',
            fontWeight: props.isHome ? 500 : 700,
          }}
          // className = {props.isHome? 'remain' : 'selected'}
          className={`remain ${props.isHome ? '' : 'active'}`}
        >
          Contact Us
        </span>
      </div>

      <div className="header__right" style={rightSideStyle}>
        <button className="header__right--login" style={LoginBtnStyle} onClick={() => navigate('/auth', { state: { status: "login" } })}>Login</button>
        <button className="header__right-tryfree" style={TryfreeBtnStyle} onClick={() => navigate('/auth', { state: { status: "register" } })}><span>Try for free now</span><img src={arrow} width='25.38p;' height='18.88px' /></button>
      </div>

    </div>
  );
}

export default Navigate;
