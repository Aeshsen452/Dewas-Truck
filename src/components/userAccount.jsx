import React from 'react';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const items = [
   
    {
        key: '1',
        label: 'Profile',
        // extra: '⌘P',
    },
    {
        key: '2',
        label: 'Logout',
        // extra: '⌘B',
    },
  
];
const UserMenu = () => (
    <Dropdown menu={{ items }}>
        <a onClick={(e,key) => {e.preventDefault();
            console.log(e.target.value)
        }}>
            <Space>
                <UserOutlined />
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
);
export default UserMenu;