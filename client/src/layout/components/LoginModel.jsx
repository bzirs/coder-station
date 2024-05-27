import React from 'react';
import {Modal} from "antd";
import PropTypes from "prop-types";

const LoginModel = ({isLoginOpen, closeLoginModel}) => {

    const handleOk = () => {
        closeLoginModel();
    };
    const handleCancel = () => {
        closeLoginModel();
    };


    return (
        <Modal title="Basic Modal" open={isLoginOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
};

LoginModel.propTypes = {
    isLoginOpen: PropTypes.bool,
    closeLoginModel: PropTypes.func,
};

export default LoginModel;