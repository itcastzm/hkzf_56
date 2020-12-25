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
        const { titleSelectedStatus, selectedValues } = this.state;
        let newTitlteSelectValues = { ...titleSelectedStatus };

        // ['area', 'mode', 'price', 'more' ]
        Object.keys(titleSelectedStatus).forEach((key) => {

            let selectValue = selectedValues[key];

            if (key === type) {
                // 是不是当前点击项
                newTitlteSelectValues[key] = true;
            } else if (key === 'area' && (selectValue[1] !== 'null' || selectValue[0] != 'area')) {
                // 区域
                newTitlteSelectValues[key] = true;
            } else if (key === 'mode' && selectValue[0] !== 'null') {
                // 方式
                newTitlteSelectValues[key] = true;
            } else if (key === 'price' && selectValue[0] !== 'null') {
                // 价格
                newTitlteSelectValues[key] = true;
            } else if (key === 'more') {
                // TODO
            } else {
                newTitlteSelectValues[key] = false;
            }

        })


        this.setState({
            titleSelectedStatus: newTitlteSelectValues,
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


    renderFilterMore() {
        const { openType, filterData: {
            characteristic,
            floor,
            oriented,
            roomType
        } } = this.state;

        if (openType === 'more') {

            return <FilterMore data={{
                characteristic,
                floor,
                oriented,
                roomType
            }} />
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
                    {this.renderFilterMore()}
                </div>
            </div>
        )
    }
}
