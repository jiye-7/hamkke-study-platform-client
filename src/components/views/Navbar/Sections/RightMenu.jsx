import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { isEmpty } from 'lodash';
import { logoutUser } from '../../../../_actions/userAction';
import { Menu } from 'antd';
import {
	EditOutlined,
	LoginOutlined,
	LogoutOutlined,
	IdcardOutlined,
} from '@ant-design/icons';

function RightMenu() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currentPageKey, setCurrentPageKey] = useState('');
	const { loginSuccess } = useSelector((state) => state.user);
	const [, , removeCookie] = useCookies(['TID']); // const [cookie, setCookie, removeCookie] = useCookies(['TID']);

	const handleClick = (e) => {
		setCurrentPageKey(e.key);
	};

	const handleLogout = () => {
		dispatch(logoutUser(removeCookie));
		navigate('/');
	};

	const renderRightMenu = () => {
		return isEmpty(loginSuccess) ? (
			<>
				<Menu.Item key='login' icon={<LoginOutlined />}>
					<Link to='/login'>로그인</Link>
				</Menu.Item>
			</>
		) : (
			<>
				<Menu.Item key='userInfo' icon={<IdcardOutlined />}>
					<Link to='/userInfo'>마이 페이지</Link>
				</Menu.Item>
				<Menu.Item
					key='logout'
					icon={<LogoutOutlined />}
					onClick={handleLogout}
				>
					로그아웃
				</Menu.Item>
			</>
		);
	};

	return (
		<div className='menu__right-menu'>
			<Menu onClick={handleClick}>
				<Menu.Item key='newpost' icon={<EditOutlined />}>
					<Link to='/write'>새 글 쓰기</Link>
				</Menu.Item>
				{renderRightMenu()}
			</Menu>
		</div>
	);
}

export default RightMenu;
