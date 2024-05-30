import React from 'react';
import {Avatar, List, Popover} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUserInfo} from "../../store/modules/global/index.js";


const HeaderAvatar = props => {

    const userInfo = useSelector(selectorUserInfo)

    const dropdownData = [
        {
            value: '个人信息',
            path: '/books',
        },
        {
            value: '退出登录',
            path: '/books',
        },
    ]


    const dropdownContent = (
        <List
            dataSource={dropdownData}
            renderItem={(item) => <List.Item><NavLink to={item.path}>{item.value}</NavLink></List.Item>}
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