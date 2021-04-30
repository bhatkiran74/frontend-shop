import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'



const { SubMenu, Item } = Menu;



const Header = () => {

    const { user } = useSelector((state) => ({ ...state }))
    console.log("user->>>>>>>>>>>>", user);
    const [current, setcurrent] = useState('')

    const history = useHistory();
    const dispatch = useDispatch()
    const handleClick = (e) => {

        setcurrent(e.key);
        console.log(e.key);
    }


    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        })
        toast.success("Logout from myshop")
        history.push('/login');

    }


    return (

        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Item key="home" icon={<AppstoreOutlined />}>
                    <Link to="/"> Home</Link>
                </Item>

                {!user && (<Item key="register" className="float-right" icon={<UserAddOutlined />}>
                    <Link to="/register">Register</Link>
                </Item>)}
                {!user && (<Item key="login" className="float-right" icon={<UserOutlined />}>
                    <Link to="/login">Login</Link>
                </Item>)}

                {user && (<SubMenu className="float-right" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]}>

                    <Item key="dashboard">Dashboard</Item>
                    <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>Logout</Item>


                </SubMenu>)}

            </Menu>

        </div >
    )
}

export default Header
