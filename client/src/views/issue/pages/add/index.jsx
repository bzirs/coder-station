import {Button, Form, Input, message, Select} from "antd";

import styles from "./index.module.scss";
import {useRef, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import {useDispatch, useSelector} from "react-redux";
import {getTypes, selectorTypes} from "../../../../store/modules/type/index.js";
import {typeOptionCreator} from "../../../../utils/tools.js";
import {selectorUserInfo} from "../../../../store/modules/global/index.js";
import {useNavigate} from "react-router-dom";
import {addIssueApi} from "../../../../api/issue.js";


function AddIssue(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const mdRef = useRef(null);

    const [formRef] = Form.useForm()

    const typeOptions = typeOptionCreator(useSelector(selectorTypes))

    const {_id: id = ''} = useSelector(selectorUserInfo)

    if (!typeOptions.length) dispatch(getTypes())


    const [mdValue, setMDValue] = useState('');

    /**
     * 提交问答的回调函数
     */
    async function addHandle(formData) {
        const issueContent = document.querySelector('.wmde-markdown').innerHTML
        const data = {...formData, userId: id, issueContent}

        try {

            await addIssueApi(data)
            message.success('添加成功')
            navigate('/')

        } catch (err) {
            console.log(err)
        }
    }

    const handleResetForm = () => {
        formRef.resetFields()

    }

    return (
        <div className={styles.container}>
            <Form
                name="basic"
                autoComplete="off"
                form={formRef}
                onFinish={addHandle}
            >
                {/* 问答标题 */}
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{required: true, message: '请输入标题'}]}
                >
                    <Input
                        placeholder="请输入标题"
                        size="large"

                    />
                </Form.Item>

                {/* 问题类型 */}
                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{required: true, message: '请选择问题所属分类'}]}
                >
                    <Select
                        options={typeOptions}
                        style={{width: 200}}
                        placeholder="请选择问题分类"
                    >
                    </Select>
                </Form.Item>


                {/* 问答内容 */}
                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{required: true, message: '请输入问题描述'}]}
                >
                    <MDEditor
                        height={350}
                        visibleDragbar={false}
                        ref={mdRef}
                    />
                </Form.Item>


                {/* 确认按钮 */}
                <Form.Item wrapperCol={{offset: 3, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        新增
                    </Button>

                    <Button type="link" htmlType="button" className="resetBtn" onClick={handleResetForm}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddIssue;