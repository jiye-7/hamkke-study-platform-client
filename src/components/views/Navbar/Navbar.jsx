import React from 'react';
import { Menu } from 'antd';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

function Navbar() {
  return (
    <nav className='menu'>
      <LeftMenu />
      <RightMenu />
    </nav>
  );
}

export default Navbar;
