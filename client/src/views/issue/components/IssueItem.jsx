import React, {useEffect, useState} from 'react';
import styles from './IssueItem.module.scss'
import PropTypes from "prop-types";
import {formatDate} from "../../../utils/tools.js";
import {Tag} from "antd";
import {useSelector} from "react-redux";
import {selectorTypes} from "../../../store/modules/type/index.js";
import {getUserInfoApi} from "../../../api/user.js";
import {useNavigate} from "react-router-dom";

const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"]


const IssueItem = props => {
    const {issueInfo} = props

    const tags = useSelector(selectorTypes)
    const [userInfo, setUserInfo] = useState({})

    const navigate = useNavigate()


    const type = tags.find(tag => tag._id === issueInfo.typeId);

    useEffect(() => {


        const fetchUserInfo = async () => {
            // 查询对应用户信息
            const {data} = await getUserInfoApi(issueInfo.userId)
            setUserInfo(data)
        }

        fetchUserInfo()
    }, [])

    return (
        <div className={styles.container}>
            {/* 回答数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.commentNumber}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.top}
                     onClick={() => navigate(`/issue/${props.issueInfo._id}`)}>{props.issueInfo.issueTitle}</div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        {/* 取余获取颜色列表中的下标 */}
                        <Tag color={colorArr[tags.indexOf(type) % colorArr.length]}>{type?.typeName}</Tag>
                    </div>
                    <div className={styles.right}>
                        <Tag color="volcano">{userInfo.nickname}</Tag>
                        <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

IssueItem.propTypes = {
    issueInfo: PropTypes.shape({
        issueNum: PropTypes.number,
        scanNumber: PropTypes.number,
        issueTitle: PropTypes.string,
    })
};

export default IssueItem;