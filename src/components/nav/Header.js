import React, { useState } from 'react'

import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";






const { SubMenu, Item } = Menu;



const Header = () => {
    const [current, setcurrent] = useState('')


    const handleClick = (e) => {

        setcurrent(e.key);
        console.log(e.key);
    }


    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Item key="home" icon={<AppstoreOutlined />}>
                    <Link to="/"> Home</Link>
                </Item>

                <Item key="register" className="float-right" icon={<UserAddOutlined />}>
                    <Link to="/register">Register</Link>
                </Item>
                <Item key="login" className="float-right" icon={<UserOutlined />}>
                    <Link to="/login">Login</Link>
                </Item>

                <SubMenu icon={<SettingOutlined />} title="bhatkiran74">

                    <Item key="dashboard">Dashboard</Item>
                    <Item key="logout">Logout</Item>


                </SubMenu>

            </Menu>

        </div>
    )
}

export default Header
