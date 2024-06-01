import React from 'react';

import styles from './index.module.scss';
import PropTypes from "prop-types";

const PageHeader = props => {
    return (
        <div className={styles.row}>
            <div className={styles.pageHeader}>
                {props.title}
            </div>
            {/* 分类选择 */}
        </div>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string,
};

export default PageHeader;