import React, {useEffect, useState} from 'react';
import {getIssueListApi} from "../../api/issue.js";
import IssueItem from "./components/IssueItem.jsx";
import PageHeader from "../../components/PageHeader/index.jsx";
import styles from "./index.module.scss";
import {Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getTypes, selectorTypes} from "../../store/modules/type/index.js";
import AddIssue from "./components/AddIssue.jsx";
import Recommend from "./components/Recommend.jsx";
import ScoreRank from "./components/ScoreRank.jsx";

const Issue = props => {

    const dispatch = useDispatch();
    const tags = useSelector(selectorTypes)


    useEffect(() => {

        if (!tags.length) {
            dispatch(getTypes())

        }
    }, [])

    const [issues, setIssues] = useState([]);

    const [params, setParams] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    })

    const getDataList = async () => {

        const paramsData = {
            current: params.current, pageSize: params.pageSize, issueStatus: true
        }
        try {
            const {data} = await getIssueListApi(paramsData)

            setIssues(data.data)
            setParams({
                current: data.currentPage,
                pageSize: data.eachPage,
                total: data.count,
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log('zhixing')
        getDataList()
    }, [params.current, params.pageSize])


    const handleChange = (page, pageSize) => {

        setParams({
            ...params,
            current: page,
            pageSize: pageSize,
        })
    }

    const issuesJSX = issues.map(issue => (<IssueItem issueInfo={issue} key={issue._id}/>))

    return (
        <div className={styles.container}>
            <PageHeader title="问答列表"/>
            <div className={styles.issueContainer}>
                <div className={styles.leftSide}>
                    {issuesJSX}
                    <Pagination
                        current={params.current}
                        showTotal={(total) => `共 ${total} 条`} showSizeChanger
                        total={params.total}
                        onChange={handleChange}/>
                </div>
                <div className={styles.rightSide}>
                    <AddIssue/>
                    <Recommend/>
                    <ScoreRank/>
                </div>
            </div>

        </div>
    );
};

Issue.propTypes = {};

export default Issue;