import React from 'react';
import PropTypes from 'prop-types';
import IssueItem from "../../issue/components/IssueItem.jsx";

// 只作为容器盒子

const ResultItem = props => {
    return (
        <div>
            {
                props.info ? <IssueItem issueInfo={props.info}/> : null
            }
        </div>
    );
};

ResultItem.propTypes = {
    info: PropTypes.object.isRequired,
};

export default ResultItem;