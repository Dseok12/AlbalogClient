import StoreList from 'components/landing/StoreList/StoreList';
import StoreRegister from 'components/landing/StoreRegister/StoreRegister';
import React, { useState } from 'react';
import './Landing.scss';

const Landing = () => {
  const [registerState, setRegisterState] = useState(false);

  const ToggleButton = () => {
    setRegisterState(!registerState);
  };
  return (
    <div id="LandingPage" className="page-layout">
      <div className="landing">
        <div className="lp-tit">
          <h3>매장 리스트</h3>
        </div>
        <div className="lp-cont">
          <StoreList />
        </div>
        <div className="lp-regi">
          <button onClick={ToggleButton}>매장 추가</button>
          {registerState && <StoreRegister ToggleButton={ToggleButton} />}
        </div>
      </div>
    </div>
  );
};

export default Landing;