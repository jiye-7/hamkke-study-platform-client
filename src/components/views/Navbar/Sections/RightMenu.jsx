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
	ReadOutlined,
	LikeOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function RightMenu() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [currentPageKey, setCurrentPageKey] = useState('');
	const user = useSelector(({ user }) => user.userInfo);
	const [, , removeCookie] = useCookies(['TID']); // const [cookie, setCookie, removeCookie] = useCookies(['TID']);

	const handleClick = (e) => {
		setCurrentPageKey(e.key);
	};

	const handleLogout = () => {
		dispatch(logoutUser(removeCookie));
		navigate('/');
	};

	const renderRightMenu = () => {
		return user?.id ? (
			<Menu>
				<Menu.Item key='newpost' icon={<EditOutlined />}>
					<Link to='/write'>새 글 쓰기</Link>
				</Menu.Item>
				<SubMenu key='submenu' title={user.nickname}>
					<Menu.Item key='myPosts' icon={<ReadOutlined />}>
						<Link to='/myPosts'>내 작성글</Link>
					</Menu.Item>
					<Menu.Item key='myLike' icon={<LikeOutlined />}>
						<Link to='/myLike'>내 관심글</Link>
					</Menu.Item>
					<Menu.Item key='userInfo' icon={<IdcardOutlined />}>
						<Link to='userInfo'>마이 페이지</Link>
					</Menu.Item>
					<Menu.Item
						key='logout'
						icon={<LogoutOutlined />}
						onClick={handleLogout}
					>
						로그아웃
					</Menu.Item>
				</SubMenu>
			</Menu>
		) : (
			<Menu>
				<Menu.Item key='newpost' icon={<EditOutlined />}>
					<Link to='/write'>새 글 쓰기</Link>
				</Menu.Item>
				<Menu.Item key='login' icon={<LoginOutlined />}>
					<Link to='/login'>로그인</Link>
				</Menu.Item>
			</Menu>
		);
	};

	return <div className='menu__right-menu'>{renderRightMenu()}</div>;
}

export default RightMenu;
