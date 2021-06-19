import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoginNav.scss';

const LoginNav = () => {
  const activeStyle = {
    borderBottom: '5px solid rgb(1, 90, 149)',
    color: 'rgb(1, 90, 149)',
    fontWeight: '700',
  };

  return (
    <div id="login-nav">
      <ul>
        <li>
          <NavLink to={`/login`} activeStyle={activeStyle}>
            관리자 로그인
          </NavLink>
        </li>
        <li>
          <NavLink to={`/parttime/login`} activeStyle={activeStyle}>
            직원 로그인
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LoginNav;
