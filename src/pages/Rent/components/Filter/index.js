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
        filterData: {},
        selectedValues: {
            area: ['area', 'null'],
            mode: ['null'],
            price: ['null'],
            more: ['null']
        }
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

    onSave = (type, value) => {


        this.setState({
            openType: '',
            selectedValues: {
                ...this.state.selectedValues,
                [type]: value
            }
        })
    }


    renderFilterPikcer() {

        const { openType, filterData: {
            area, subway, rentType, price
        }, selectedValues } = this.state;

        if (openType === 'area' || openType === 'mode' || openType === 'price') {

            let data = null;
            let cols = 1;
            let defaultValue = [];

            switch (openType) {
                case 'area':
                    data = [area, subway];
                    cols = 3;
                    defaultValue = selectedValues.area;
                    break;
                case 'mode':
                    data = rentType;
                    defaultValue = selectedValues.mode;
                    break;
                case 'price':
                    data = price;
                    defaultValue = selectedValues.price;
                    break;
                default:
                    break;
            }

            return <FilterPicker key={openType} defaultValue={defaultValue} data={data} type={openType} cols={cols} onSave={this.onSave} onCancel={this.onCancel} />;
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
