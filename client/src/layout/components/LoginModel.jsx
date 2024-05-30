import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, message, Modal, Radio, Row} from "antd";
import PropTypes from "prop-types";
import styles from './loginModel.module.scss'
import './loginModel.scss'
import {getCaptchaImg, registerUser, userIsExist} from "../../api/user.js";
import {useDispatch} from "react-redux";
import {setUserInfo, toggleLoginStatus} from "../../store/modules/global/index.js";

const LoginModel = ({isLoginOpen, closeLoginModel}) => {

    const dispatch = useDispatch()

    const [mode, setMode] = useState('login')
    const [captcha, setCaptcha] = useState(null)

    const [loginInfo, setLoginInfo] = useState({
        loginId: '',
        loginPwd: '',
        captcha: '',
        remember: false
    })
    const [registerInfo, setRegisterInfo] = useState({
        loginId: '',
        nickname: '',
        captcha: '',
    })

    const [loginFormRef] = Form.useForm()
    const [registerFormRef] = Form.useForm()


    useEffect(() => {
        captchaClickHandle().then()
    }, [isLoginOpen]);


    const handleCloseLoginModal = () => {
        registerFormRef.resetFields()
        setRegisterInfo({
            loginId: '',
            nickname: '',
            captcha: ''
        })
        setLoginInfo({
            loginId: '',
            loginPwd: '',
            captcha: '',
            remember: false
        })
    }


    const registerHandle = async (value) => {
        console.log('开始注册')

        try {
            const {data} = await registerUser(registerInfo)

            message.success('注册成功, 默认密码为 123456')

            dispatch(setUserInfo(data))
            dispatch(toggleLoginStatus())

            handleCloseLoginModal()
            closeLoginModel()

        } catch (e) {
            captchaClickHandle()
        }
    }

    const checkLoginIdIsExist = async (rule, value) => {
        const {data} = await userIsExist(value)
        if (data) {
            return Promise.reject(new Error('该id已经注册过了'))
        }

        return Promise.resolve()
    }


    // 获取验证吗
    const captchaClickHandle = async () => {
        const result = await getCaptchaImg()
        setCaptcha(result)
    }

    const updateInfo = (obj, value, key, setFunc) => {
        const data = {...obj}
        Reflect.set(data, key, value)
        setFunc(data)
    }

    // 默认注册的form jsx
    let container = (
        <div className={styles.container}>
            <Form
                name="basic2"
                autoComplete="off"
                form={registerFormRef}
                onFinish={registerHandle}
            >
                <Form.Item
                    label="登录账号"
                    name="loginId"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号，仅此项为必填项",
                        },
                        // 验证用户是否已经存在
                        {validator: checkLoginIdIsExist},
                    ]}
                    validateFirst
                    validateTrigger='onBlur'
                >
                    <Input
                        placeholder="请输入账号"
                        value={registerInfo.loginId}
                        onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                    />
                </Form.Item>

                <Form.Item
                    label="用户昵称"
                    name="nickname"
                >
                    <Input
                        placeholder="请输入昵称，不填写默认为新用户xxx"
                        value={registerInfo.nickname}
                        onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                    />
                </Form.Item>

                <Form.Item
                    name="registercaptcha"
                    label="验证码"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                >
                    <Row align="middle">
                        <Col span={16}>
                            <Input
                                placeholder="请输入验证码"
                                value={registerInfo.captcha}
                                onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                            />
                        </Col>
                        <Col span={6}>
                            <div
                                className={styles.captchaImg}
                                onClick={captchaClickHandle}
                                dangerouslySetInnerHTML={{__html: captcha}}
                            ></div>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{marginRight: 20}}
                    >
                        注册
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleCloseLoginModal}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

    const loginHandle = (e) => {
        console.log(e, 'eeeee')
    }


    if (mode === 'login') {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    form={loginFormRef}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row>
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                />
                            </Col>
                            <Col span={8}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{__html: captcha}}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>


                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{marginRight: 20}}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    const handleOk = () => {
        closeLoginModel();
    };
    const handleCancel = () => {
        closeLoginModel();
    };

    const handleModeChange = (e) => {
        captchaClickHandle().then()
        setMode(e.target.value)
    };

    return (
        <Modal title="登录/注册" open={isLoginOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Radio.Group
                onChange={handleModeChange}
                value={mode}
                className={styles.radioGroup}
            >
                <Radio.Button value="login" className={styles.radioButton}>登录</Radio.Button>
                <Radio.Button value="register" className={styles.radioButton}>注册</Radio.Button>
            </Radio.Group>

            {container}

        </Modal>
    );
};

LoginModel.propTypes = {
    isLoginOpen: PropTypes.bool,
    closeLoginModel: PropTypes.func,
};

export default LoginModel;