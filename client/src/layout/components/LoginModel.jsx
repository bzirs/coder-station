import React, {useState} from 'react';
import {Modal, Radio} from "antd";
import PropTypes from "prop-types";

import styles from './loginModel.module.scss'

const LoginModel = ({isLoginOpen, closeLoginModel}) => {

    const [mode, setMode] = useState('login')

    const handleOk = () => {
        closeLoginModel();
    };
    const handleCancel = () => {
        closeLoginModel();
    };

    const handleModeChange = (e) => {
        setMode(e.target.value)
    };

    return (
        <Modal title="登录/注册" open={isLoginOpen} onOk={handleOk} onCancel={handleCancel}>
            <Radio.Group
                onChange={handleModeChange}
                value={mode}
                className={styles.radioGroup}
            >
                <Radio.Button value="login" className={styles.radioButton}>登录</Radio.Button>
                <Radio.Button value="register" className={styles.radioButton}>注册</Radio.Button>
            </Radio.Group>

        </Modal>
    );
};

LoginModel.propTypes = {
    isLoginOpen: PropTypes.bool,
    closeLoginModel: PropTypes.func,
};

export default LoginModel;