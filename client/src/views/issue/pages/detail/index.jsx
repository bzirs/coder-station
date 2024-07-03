import React, {useEffect, useState} from 'react';
import PageHeader from "../../../../components/PageHeader/index.jsx";

import styles from './index.module.scss'
import Recommend from "../../components/Recommend.jsx";
import ScoreRank from "../../components/ScoreRank.jsx";
import {useParams} from "react-router-dom";
import {getIssueDetailApi} from "../../../../api/issue.js";
import {Avatar} from "antd";
import {formatDate} from "../../../../utils/tools.js";
import {getUserInfoApi} from "../../../../api/user.js";
import Discuss from "../../components/Discuss.jsx";

const IssueDetail = props => {
    const {id} = useParams()

    const [issueInfo, setIssueInfo] = useState({
        issueTitle: '',
        issueDate: '',
        issueContent: '',
    })

    const [userInfo, setUserInfo] = useState({})


    useEffect(() => {

        const getIssueDetail = async () => {
            const {data} = await getIssueDetailApi(id)

            setIssueInfo(data)
            const {data: userInfo} = await getUserInfoApi(data.userId)
            setUserInfo(userInfo)
        }

        getIssueDetail()
    }, [])
    return (
        <div className={styles.container}>
            <PageHeader title="问题详情"/>
            <div className={styles.detailContainer}>
                {/* 左侧 */}
                <div className={styles.leftSide}>
                    {/* 左上方：问答详情 */}
                    <div className={styles.question}>
                        {/* 标题 */}
                        <h1>{issueInfo?.issueTitle}</h1>
                        {/* 提问人信息：头像、昵称、提问时间 */}
                        <div className={styles.questioner}>
                            <Avatar size="small" src={userInfo?.avatar}/>
                            <span className={styles.user}>{userInfo?.nickname}</span>
                            <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
                        </div>
                        {/* 问题详情 */}
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{__html: issueInfo?.issueContent}}></div>
                        </div>
                    </div>
                    {/* 左下方：评论 */}
                    <Discuss
                        targetId={issueInfo?._id}
                    />
                </div>
                {/* 右侧 */}
                <div className={styles.rightSide}>
                    <div style={{marginBottom: 20}}>
                        <Recommend/>
                    </div>
                    <div style={{marginBottom: 20}}>
                        <ScoreRank/>
                    </div>
                </div>
            </div>
        </div>
    );
};

IssueDetail.propTypes = {};

export default IssueDetail;