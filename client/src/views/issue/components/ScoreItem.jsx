import {useState} from 'react';
import {Avatar} from "antd";
import classname from "classnames";
import styles from "./ScoreItem.module.scss"

const rankColors = ['#ffda23', '#c5c5c5', "#cd9a62"]

function ScoreItem(props) {

    const [classNameCollection] = useState({
        "iconfont": true,
        "icon-jiangbei": true
    })


    let rankNum = null;
    switch (props.rank) {
        case 1:
        case 2:
        case 3: {
            rankNum = (
                <div style={{
                    color: rankColors[props.rank - 1],
                    fontSize: "22px",
                }} className={classname(classNameCollection)}></div>
            )
            break;
        }

        default : {
            rankNum = (<div className={styles.rank}>{props.rank}</div>)
        }
    }

    return (
        <div className={styles.container}>
            {/* 名次，头像和昵称 */}
            <div className={styles.left}>
                {rankNum}
                <div className={styles.avatar}>
                    <Avatar size="small" src={props.rankInfo.avatar}/>
                </div>
                <div className={styles.nickname}>{props.rankInfo.nickname}</div>
            </div>
            {/* 积分 */}
            <div className={styles.right}>
                {props.rankInfo.points}
            </div>
        </div>
    );
}

export default ScoreItem;