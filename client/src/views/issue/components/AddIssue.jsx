import React from 'react';
import {Button, message} from "antd";
import {useSelector} from "react-redux";
import {selectorIsLogin} from "../../../store/modules/global/index.js";

/**
 * 添加问答
 */
function AddIssue(props) {

    const isLogin = useSelector(selectorIsLogin)

    function clickHandle() {
        if (isLogin) {
            return
        }

        message.warning('请先登录账号！')
    }


    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: "100%",
                marginBottom: "30px"
            }}
            onClick={clickHandle}
        >我要发问</Button>
    );
}

export default AddIssue;