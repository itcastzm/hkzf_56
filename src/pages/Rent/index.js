import React, { Component } from 'react';

import SearchHeader from '../../components/SearchHeader';

import { Flex } from 'antd-mobile';


import styles from './index.module.scss';

export default class Rent extends Component {
    render() {
        return (
            <div>
                <Flex className={styles.heander}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
                    <SearchHeader className={styles.searchHeader}></SearchHeader>
                </Flex>

                找房页面
            </div>
        )
    }
}
