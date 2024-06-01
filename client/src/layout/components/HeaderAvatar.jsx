import React from 'react';
import {Avatar, List, Popover} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {selectorUserInfo, setUserInfo, toggleLoginStatus} from "../../store/modules/global/index.js";
import {createLocal} from "../../utils/cache/index.js";
import {USER_TOKEN} from "../../utils/cache/constant.js";
import {useNavigate} from "react-router-dom";


const HeaderAvatar = props => {

    const userInfo = useSelector(selectorUserInfo)

    const dispatch = useDispatch();
    const tokenLocal = createLocal(USER_TOKEN)

    const navigate = useNavigate();

    const dropdownData = [
        {
            value: '个人信息',
            path: '/books',

        },
        {
            value: '退出登录',
            path: 'logout',
        },
    ]

    const handleClick = (data) => {

        if (data.path === 'logout') {
            tokenLocal.remove()
            dispatch(setUserInfo({}))
            dispatch(toggleLoginStatus(false))
            navigate('/')
            return
        }

        console.log('去个人页')
    }


    const dropdownContent = (
        <List
            dataSource={dropdownData}
            renderItem={(item) => <List.Item onClick={() => handleClick(item)}>{item.value}</List.Item>}
        />
    )
    return (
        <Popover content={dropdownContent} placement="bottom">
            <Avatar size="large" src={userInfo?.avatar || <UserOutlined/>}/>
        </Popover>

    );
};

HeaderAvatar.propTypes = {};

export default HeaderAvatar;