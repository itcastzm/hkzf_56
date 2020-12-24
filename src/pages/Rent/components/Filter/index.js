import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import API from '../../../../utils/api';

import { getCurrentCityInfo } from '../../../../utils'

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
        openType: '',
        filterData: {}
    }


    componentDidMount() {
        this.getFilterData();
    }

    async getFilterData() {

        const cityInfo = await getCurrentCityInfo();

        const res = await API.get(`/houses/condition`, {
            params: {
                id: cityInfo.value
            }
        })

        this.setState({
            filterData: res.data.body
        });
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


    renderFilterPikcer() {

        const { openType, filterData: {
            area, subway, rentType, price
        } } = this.state;

        if (openType === 'area' || openType === 'mode' || openType === 'price') {

            let data = null;
            let cols = 1;

            switch (openType) {
                case 'area':
                    data = [area, subway];
                    cols = 3;
                    break;
                case 'mode':
                    data = rentType;
                    break;
                case 'price':
                    data = price;
                    break;
                default:
                    break;
            }


            return <FilterPicker data={data} cols={cols} onSave={this.onSave} onCancel={this.onCancel} />;
        }


        return null;
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

                    {this.renderFilterPikcer()}


                    {/* 最后一个菜单对应的内容： */}
                    {/* <FilterMore /> */}
                </div>
            </div>
        )
    }
}
