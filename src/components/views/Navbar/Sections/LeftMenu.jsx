import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import HamkkeLogo from '../../../utils/image/hamkkelogo.jpg';
import '../Navbar.scss';

function LeftMenu() {
	return (
		<div className='menu__left-menu'>
			<Link to='/' className='menu__left-menu-logo'>
				<img src={HamkkeLogo} alt='logo' />
			</Link>
		</div>
	);
}

export default LeftMenu;
