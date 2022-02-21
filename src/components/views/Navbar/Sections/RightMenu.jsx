import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { EditOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

function RightMenu() {
	const [currentPageKey, setCurrentPageKey] = useState('');

	const handleClick = (e) => {
		setCurrentPageKey(e.key);
	};

	return (
		<div className='menu__right-menu'>
			<Menu onClick={handleClick}>
				<Menu.Item key='newpost' icon={<EditOutlined />}>
					<Link to='/write'>새 글 쓰기</Link>
				</Menu.Item>
				<Menu.Item key='login' icon={<LoginOutlined />}>
					<Link to='/login'>로그인</Link>
				</Menu.Item>
			</Menu>
		</div>
	);
}

export default RightMenu;
