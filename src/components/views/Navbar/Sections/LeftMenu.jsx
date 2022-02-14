import React from 'react';
import { Menu } from 'antd';
import HamkkeLogo from '../../../utils/image/hamkkelogo.jpg';
import '../Navbar.scss';

function LeftMenu() {
  return (
    <div className='menu__left-menu'>
      <a href='/' className='menu__left-menu-logo'>
        <img src={HamkkeLogo} alt='logo' />
      </a>
    </div>
  );
}

export default LeftMenu;
