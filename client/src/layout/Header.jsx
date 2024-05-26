import React from 'react';
import {Button, Input, Select, Space} from 'antd';
import {NavLink, useLocation} from "react-router-dom";
import {selectorIsLogin, toggleLoginStatus} from "../store/modules/global/index.js";
import {useDispatch, useSelector} from "react-redux";

const {Search} = Input;


const options = [
    {
        value: 'issue',
        label: '问答',
    },
    {
        value: 'book',
        label: '书籍',
    },
];

const navs = [
    {
        id: 1,
        label: '问答',
        path: '/issue',
        name: 'issue'
    },
    {
        id: 2,
        label: '书籍',
        path: '/books',
        name: 'books'
    },
    {
        id: 3,
        label: '面试题',
        path: '/interviews',
        name: 'interviews'
    },
]

const Header = props => {


    const {pathname} = useLocation()

    const isLogin = useSelector(selectorIsLogin);
    const dispatch = useDispatch()

    const navigateClass = (path) => {
        if (pathname === path) return 'navigation navigation-active'
        return 'navigation'
    }

    return (
        <div className="headerContainer">
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            <div className="navContainer">

                {
                    navs.map(nav =>
                        (<NavLink className={() => navigateClass(nav.path)} to={nav.path}
                                  key={nav.id}>{nav.label}</NavLink>))
                }
                <a className="navigation" href="https://blog.aiox.dev" target="_blank">博客</a>
            </div>
            <div className="searchContainer">
                <Space.Compact block>
                    <Select defaultValue="issue" options={options} size="large"/>
                    <Input placeholder="输入要搜索的内容" allowClear/>
                    <Button type="primary" size='large'>搜索</Button>
                    {/*<Search placeholder="输入要搜索的内容" enterButton="搜索" size="large"/>*/}
                </Space.Compact>
            </div>
            <div className="loginBtnContainer">
                {!isLogin && <Button type="primary" size='large'
                                     onClick={() => dispatch(toggleLoginStatus())}>登录/注册</Button>}
                {isLogin && '已经登录了'}

            </div>
        </div>
    );
};

Header.propTypes = {};

export default Header;