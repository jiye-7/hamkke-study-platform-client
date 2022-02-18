import React, { useState } from 'react';
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
          <a href='/write'>새 글 쓰기</a>
        </Menu.Item>
        <Menu.Item key='login' icon={<LoginOutlined />}>
          <a href='/login'>로그인</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default RightMenu;
