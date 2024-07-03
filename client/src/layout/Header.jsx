import React, {useState} from 'react';
import {Button, Input, Select, Space} from 'antd';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {selectorIsLogin} from "../store/modules/global/index.js";
import {useDispatch, useSelector} from "react-redux";
import HeaderAvatar from "./components/HeaderAvatar.jsx";
import LoginModel from "./components/LoginModel.jsx";

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
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const {pathname} = useLocation()
    const isLogin = useSelector(selectorIsLogin);
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [searchData, setSearchData] = useState({
        issueTitle: '',
        type: 'issue'
    })

    const closeLoginModel = () => {
        setIsLoginModalOpen(false);
    }
    const openLoginModel = () => {
        setIsLoginModalOpen(true);
    }

    const navigateClass = (path) => {
        if (pathname === path) return 'navigation navigation-active'
        return 'navigation'
    }

    const handleToLogin = () => {
        // dispatch(toggleLoginStatus())
        console.log('wozhixingle')
        setIsLoginModalOpen(true)

    }

    const handleTypeChange = (value) => {

        setSearchData(state => ({
            issueTitle: state.issueTitle,
            type: value,
        }))
    }
    const handleValueChange = (value) => {

        const text = value.target.value


        if (!text) {
            navigate('/issue')
            return
        }

        setSearchData(state => ({
            issueTitle: text,
            type: state.type,
        }))
    }

    const handleSearchSubmit = () => {
        console.log(searchData)

        if (searchData.issueTitle) {
            navigate('/search-result', {state: searchData})
        }
    }

    // useEffect(() => {
    //     if (!searchData.issueTitle) {
    //         navigate('/')
    //     }
    // }, [searchData.issueTitle])

    return (
        <>
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
                        <Select defaultValue="issue" options={options} size="large" onChange={handleTypeChange}/>
                        <Input placeholder="输入要搜索的内容" allowClear onChange={handleValueChange}/>
                        <Button type="primary" size='large' onClick={handleSearchSubmit}>搜索</Button>
                        {/*<Search placeholder="输入要搜索的内容" enterButton="搜索" size="large"/>*/}
                    </Space.Compact>
                </div>
                <div className="loginBtnContainer">
                    {!isLogin && <Button type="primary" size='large'
                                         onClick={handleToLogin}>登录/注册</Button>}
                    {isLogin && <HeaderAvatar
                    />}

                </div>
            </div>
            <LoginModel isLoginOpen={isLoginModalOpen} closeLoginModel={closeLoginModel}/>
        </>

    );
};

Header.propTypes = {};

export default Header;