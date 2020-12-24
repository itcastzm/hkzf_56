import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'


const titleSelectedStatus = {
    area: false,
    mode: false,
    price: false,
    more: false
};

export default class Filter extends Component {

    state = {
        titleSelectedStatus,
        openType: ''
    }


    onTitleClick = (type) => {
        // console.log('type', type);
        this.setState({
            titleSelectedStatus: {
                ...this.state.titleSelectedStatus,
                [type]: true
            },
            openType: type
        });
    }

    onCancel = () => {
        this.setState({
            openType: ''
        })
    }

    onSave = () => {
        this.setState({
            openType: ''
        })
    }



    render() {

        const { openType } = this.state;
        return (
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层 */}
                {
                    openType === 'area' || openType === 'mode' || openType === 'price' ?
                        <div className={styles.mask} onClick={this.onCancel} /> : null
                }

                <div className={styles.content}>
                    {/* 标题栏 */}
                    <FilterTitle titleSelectedStatus={this.state.titleSelectedStatus} onTitleClick={this.onTitleClick} />

                    {/* 前三个菜单对应的内容： */}

                    {
                        openType === 'area' || openType === 'mode' || openType === 'price' ?
                            <FilterPicker onSave={this.onSave} onCancel={this.onCancel} /> : null
                    }


                    {/* 最后一个菜单对应的内容： */}
                    {/* <FilterMore /> */}
                </div>
            </div>
        )
    }
}
