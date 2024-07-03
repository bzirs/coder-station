import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectorTypes} from "../../../store/modules/type/index.js";
import {Tag} from "antd";
import PropTypes from "prop-types";

const colors = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];


const TypeSelect = ({getTypeDataFunc}) => {

    const types = useSelector(selectorTypes)

    const handleSelectTypeData = (e, id) => {
        e.preventDefault()

        getTypeDataFunc(id)
    }

    const [tags, setTags] = useState([])

    useEffect(() => {
        const arr = []
        console.log('执行了')
        arr.push(
            <Tag key='all'>
                <a href='#' onClick={(e) => handleSelectTypeData(e, null)}>
                    全部
                </a>
            </Tag>
        )
        arr.push(...types.map((type, i) => (
            <Tag color={colors[i % colors.length]} key={type._id}>
                <a href='#' onClick={(e) => handleSelectTypeData(e, type._id)}>
                    {type.typeName}
                </a>
            </Tag>
        )))

        setTags(arr)
    }, [types])


    return (
        <div>
            {tags}
        </div>
    );
};

TypeSelect.propTypes = {
    getTypeDataFunc: PropTypes.func.isRequired,
};

export default TypeSelect;