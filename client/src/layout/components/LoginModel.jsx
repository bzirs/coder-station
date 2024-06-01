import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, message, Modal, Radio, Row} from "antd";
import PropTypes from "prop-types";
import styles from './loginModel.module.scss'
import './loginModel.scss'
import {getCaptchaImg, getUserInfoApi, loginUserApi, registerUser, userIsExist} from "../../api/user.js";
import {useDispatch} from "react-redux";
import {setUserInfo, toggleLoginStatus} from "../../store/modules/global/index.js";
import {isNull} from "lodash";
import {createLocal} from "../../utils/cache/index.js";
import {USER_TOKEN} from "../../utils/cache/constant.js";


const LoginModel = ({isLoginOpen, closeLoginModel}) => {

    const tokenLocal = createLocal(USER_TOKEN)

    const dispatch = useDispatch()

    const [mode, setMode] = useState('login')
    const [captcha, setCaptcha] = useState(null)

    const [form] = Form.useForm()


    useEffect(() => {
        isLoginOpen && captchaClickHandle().then()

    }, [isLoginOpen]);


    const handleCloseLoginModal = () => {
        // 获取当前正在使用的form表单实例
        // const form = Form.useFormInstance()
        form.resetFields()
    }

    const registerHandle = async (value) => {
        console.log('开始注册', value)

        try {
            const {data} = await registerUser(value)

            message.success('注册成功, 默认密码为 123456')

            dispatch(setUserInfo(data))
            dispatch(toggleLoginStatus(true))
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
        form.resetFields(['captcha'])

    }


    // 默认注册的form jsx
    let container = (
        <div className={styles.container}>
            <Form
                name="form"
                form={form}
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
                    />
                </Form.Item>

                <Form.Item
                    label="用户昵称"
                    name="nickname"
                >
                    <Input
                        placeholder="请输入昵称，不填写默认为新用户xxx"
                    />
                </Form.Item>

                <Form.Item
                    name="captcha"
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
                    <Button htmlType="button" onClick={handleCloseLoginModal}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

    const loginHandle = async (formData) => {

        try {

            const {data: {data = null, token = ''}} = await loginUserApi(formData)
            console.log(data, isNull(data))

            if (isNull(data)) {
                message.error('密码错误,请重新输入')
                form.resetFields(['loginPwd'])
                captchaClickHandle()
                return
            }


            if (data.enabled && !data.enabled) {
                message.error('该账号已被冻结,请联系管理员')
                form.resetFields()
                captchaClickHandle()

                return
            }


            tokenLocal.set(token)

            const {data: userInfo} = await getUserInfoApi(data._id)

            message.success('登录成功')

            dispatch(setUserInfo(userInfo))
            dispatch(toggleLoginStatus(true))
            closeLoginModel()


        } catch (e) {
            console.log(e)
            captchaClickHandle()

        }
    }


    if (mode === 'login') {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    form={form}
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
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="captcha"
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

                    {/* checkbox等组件要设置valuePropName方式获取数据 */}
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
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
                        <Button htmlType="button" onClick={handleCloseLoginModal}>
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