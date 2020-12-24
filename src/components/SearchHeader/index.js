import React from 'react'

import { Flex } from 'antd-mobile';

import { withRouter } from 'react-router-dom';

import './index.scss';

function SearchHeader(props) {
    return (
        <Flex className={`search-box ${props.className || ''}`} >
            <Flex className="search">
                <div className="location" onClick={() => props.history.push('/citylist')}>
                    {props.cityName || '上海'}
                    <i className="iconfont icon-arrow"></i>
                </div>
                <div className="form">
                    <i className="iconfont icon-seach"></i>
                    <span>请输入小区或地址</span>
                </div>
            </Flex>
            <i className="iconfont icon-map" onClick={() => props.history.push('/map')}></i>
        </Flex >
    )
}


export default withRouter(SearchHeader);