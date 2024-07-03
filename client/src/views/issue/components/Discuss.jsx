import React, {useRef} from 'react';
import PropTypes from "prop-types";
import {Button, Form} from 'antd';
import MDEditor from "@uiw/react-md-editor";
import {useSelector} from "react-redux";
import {selectorIsLogin} from "../../../store/modules/global/index.js";

const Discuss = props => {

    const mdRef = useRef(null);

    const isLogin = useSelector(selectorIsLogin);

    const handleComment = (value) => {
        console.log(value)
    }

    return (
        <div>
            <Form onFinish={handleComment}>
                <Form.Item>
                    评论
                </Form.Item>
                <Form.Item
                    name='commentContent'
                >
                    <MDEditor
                        height={250}
                        visibleDragbar={false}
                        ref={mdRef}
                        preview={isLogin ? 'edit' : 'preview'}
                        extraCommands={[]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!isLogin}
                    >添加评论</Button>
                </Form.Item>
            </Form>

        </div>
    );
};

Discuss.propTypes = {
    targetId: PropTypes.string,
};

export default Discuss;