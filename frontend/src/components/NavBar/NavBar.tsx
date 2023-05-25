import {
    Menu,
    MenuProps,
    Button,
  } from "antd"

import { HomeFilled, AppstoreOutlined, UserOutlined,SettingOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const NavBar = (user:any) => {
    const { auth, clearAuthLocalStorage } = useAuth();
    const [current, setCurrent] = useState('home');
    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };

    const noAuthMenu: MenuProps['items'] = [
        {
          key: 'home',
          label: <Link to="/home"/>,
          icon: <HomeFilled />,
        },
        {
          key: 'login',
          label: <Link to="/login"> Login </Link>,
        },
        {
          key: 'signup',
          label: <Link to="/signup"> Signup </Link>,
        },
      ];
    
    
    
    const authMenu: MenuProps['items'] = [
        {
          key: 'home',
          label: <Link to="/home"/>,
          icon: <HomeFilled/>,
        },
        {
          key: 'users',
          label: <Link to="/users"> Users </Link>,
          icon: <UserOutlined />,
        },
        {
          key: 'setting',
        //   label: <Button onClick={clearAuthLocalStorage}> {auth?.username} / Logout </Button>,
          icon: <SettingOutlined />,
          children: [
            {
                key: 'setting:settting',
                label: <Link to="/setting"> Setting </Link>,
            },
            {
                key: 'setting:logut',
                label: <Button onClick={clearAuthLocalStorage}> {auth?.username} / Logout </Button>,
            },
          ]
        },
      ];

    return ( <>
        {auth?.username && (
          <Menu
          theme="light"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={authMenu}
          style={{ justifyContent: 'flex-end'}}
          />
        )}
        {!auth?.username && (
            <Menu
            theme="light"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={noAuthMenu}
            style={{ justifyContent: 'flex-end'}}
            />
        )}
    </> );
}
 
export default NavBar;