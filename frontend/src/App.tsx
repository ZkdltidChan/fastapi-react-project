import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Layout,
  Menu,
} from "antd"
import type { MenuProps } from 'antd';
// import { NavBar } from "./components/NavBar/NavBar";


import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import SignupPage from "./pages/Auth/SignupPage";
import UserList from "./pages/User/List";



import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

const menuItems: MenuProps['items'] = [
  {
    key: 'home',
    label: <Link to="/home"> Home </Link>,
  },
  {
    key: 'users',
    label: <Link to="/users"> Users </Link>,
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


export const App = () => {
  const [current, setCurrent] = useState('home');
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <ConfigProvider>

      <BrowserRouter>
        <Header>
          <div className="demo-logo" />
          <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />
        </Header>
        <Content>
          <Routes>
            <Route path="/one" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </Content>
        <Footer
          style={{
            borderTop: '1px solid #e8e8e8',
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: 'white',
            textAlign: 'center'
          }}
        >...footer...</Footer>
      </BrowserRouter>

    </ConfigProvider >
  )
}

export default App;