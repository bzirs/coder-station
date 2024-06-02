import {Button, Form, Input} from "antd";

import styles from "./index.module.scss";

function AddIssue(props) {

    const [formRef] = Form.useForm()
    const issueInfo = {}

    /**
     * 提交问答的回调函数
     */
    function addHandle() {

    }

    /**
     * 下拉列表选项改变的时候会触发的回调
     */
    function handleChange(value) {
    }

    return (
        <div className={styles.container}>
            <Form
                name="basic"
                initialValues={issueInfo}
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
                    {/*<Select*/}
                    {/*    style={{width: 200}}*/}
                    {/*    onChange={handleChange}>*/}
                    {/*    {typeOptionCreator(Select, typeList)}*/}
                    {/*</Select>*/}
                </Form.Item>


                {/* 问答内容 */}
                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{required: true, message: '请输入问题描述'}]}
                >

                </Form.Item>


                {/* 确认按钮 */}
                <Form.Item wrapperCol={{offset: 3, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>

                    <Button type="link" htmlType="button" className="resetBtn">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddIssue;