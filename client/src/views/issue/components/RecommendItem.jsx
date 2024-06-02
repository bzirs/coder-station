import React from 'react';
import styles from "./RecommendItem.module.scss"
import PropTypes from "prop-types";

function RecommendItem(props) {
    return (
        <a className={styles.container} href={props.recommendInfo.href} target="_blank" rel="noreferrer">
            <div className={styles.leftSide}>{props.recommendInfo.num}</div>
            <div className={styles.rightSide}>{props.recommendInfo.title}</div>
        </a>
    );
}

RecommendItem.propTypes = {
    recommendInfo: PropTypes.shape({
        href: PropTypes.string,
        num: PropTypes.number,
        title: PropTypes.string,
    })
};

export default RecommendItem;