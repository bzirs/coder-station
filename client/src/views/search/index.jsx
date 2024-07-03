import React, {useEffect, useState} from 'react';
import {getIssueListApi} from "../../api/issue.js";
import PageHeader from "../../components/PageHeader/index.jsx";
import styles from "./index.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getTypes, selectorTypes} from "../../store/modules/type/index.js";
import Recommend from "../issue/components/Recommend.jsx";
import ScoreRank from "../issue/components/ScoreRank.jsx";
import ResultItem from "./components/ResultItem.jsx";
import {useLocation} from "react-router-dom";

const Search = props => {

    const dispatch = useDispatch();

    const tags = useSelector(selectorTypes)

    const {state} = useLocation()

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


        if (state.type === 'issue') {

            Reflect.set(paramsData, 'issueTitle', state.issueTitle)
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
        if (!tags.length) {
            dispatch(getTypes())

        }

        if (state) {
            getDataList()
        }
    }, [state])


    const issuesJSX = issues.map(issue => (<ResultItem info={issue} key={issue._id}/>))

    return (
        <div className={styles.container}>
            <PageHeader title="搜索结果">
            </PageHeader>
            <div className={styles.issueContainer}>
                <div className={styles.leftSide}>
                    {issuesJSX}
                </div>
                <div className={styles.rightSide}>
                    <Recommend/>
                    <ScoreRank/>
                </div>
            </div>

        </div>
    );
};

Search.propTypes = {};

export default Search;