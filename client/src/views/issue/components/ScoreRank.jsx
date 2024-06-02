import {useEffect, useState} from 'react';
import ScoreItem from "./ScoreItem";
import {Card} from "antd";
import {getUserByPointsRank} from "../../../api/user.js";

/**
 * 积分排名
 */
function ScoreRank(props) {

    // 存储用户排名信息的
    const [userRankInfo, setUserRankInfo] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            const {data} = await getUserByPointsRank();
            setUserRankInfo(data);
        }

        fetchUser();
    }, [])


    const userPointsRankArr = userRankInfo.map((rank, index) => (<ScoreItem
        rankInfo={rank}
        rank={index + 1}
        key={rank._id}
    />));


    return (
        <Card title="积分排行榜">
            {userPointsRankArr}
        </Card>
    );
}

export default ScoreRank;