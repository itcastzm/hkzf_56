import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import API from '../../../../utils/api';

import { getCurrentCityInfo } from '../../../../utils'

import styles from './index.module.css';

import { Spring } from 'react-spring/renderprops';


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
            more: []
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
            } else if (key === 'more' && selectValue.length) {
                newTitlteSelectValues[key] = true;
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

        // console.log('type', type);
        const { titleSelectedStatus, selectedValues } = this.state;

        let newTitlteSelectValues = { ...titleSelectedStatus };

        // ['area', 'mode', 'price', 'more' ]
        Object.keys(titleSelectedStatus).forEach((key) => {

            let selectValue = selectedValues[key];

            if (key === 'area' && (selectValue[1] !== 'null' || selectValue[0] != 'area')) {
                // 区域
                newTitlteSelectValues[key] = true;
            } else if (key === 'mode' && selectValue[0] !== 'null') {
                // 方式
                newTitlteSelectValues[key] = true;
            } else if (key === 'price' && selectValue[0] !== 'null') {
                // 价格
                newTitlteSelectValues[key] = true;
            } else if (key === 'more' && selectValue.length) {
                newTitlteSelectValues[key] = true;
            } else {
                newTitlteSelectValues[key] = false;
            }

        })


        this.setState({
            openType: '',
            titleSelectedStatus: newTitlteSelectValues
        });
    }

    onSave = (type, value) => {

        // console.log('type', type);
        const { titleSelectedStatus, selectedValues } = this.state;
        let newSelectValues = {
            ...selectedValues,
            [type]: value
        };
        let newTitlteSelectValues = { ...titleSelectedStatus };

        // ['area', 'mode', 'price', 'more' ]
        Object.keys(titleSelectedStatus).forEach((key) => {

            let selectValue = newSelectValues[key];

            if (key === 'area' && (selectValue[1] !== 'null' || selectValue[0] != 'area')) {
                // 区域
                newTitlteSelectValues[key] = true;
            } else if (key === 'mode' && selectValue[0] !== 'null') {
                // 方式
                newTitlteSelectValues[key] = true;
            } else if (key === 'price' && selectValue[0] !== 'null') {
                // 价格
                newTitlteSelectValues[key] = true;
            } else if (key === 'more' && selectValue.length) {
                newTitlteSelectValues[key] = true;
            } else {
                newTitlteSelectValues[key] = false;
            }

        });


        // 是不是可以触发发请求了？

        // 针对  newSelectValues 值做处理
        let filters = {};

        // 针对area 区域
        let areaList = newSelectValues.area;

        let areaKey = areaList[0] === 'area' ? 'area' : 'subway';
        let areaValue = '';

        if (areaList.length === 3 && areaList[2] !== 'null') {
            areaValue = areaList[2];
        } else {
            areaValue = areaList[1]
        }
        // areaValue 总结：只有长度为3 并且数组第三个元素不为 null  值取第三个元素 否则值都取第二个元素

        filters[areaKey] = areaValue;
        // if (areaList.length === 2) {
        //     areaValue = areaList[1];
        // } else if (areaList.length === 3) {
        //     if (areaList[2] === 'null') {
        //         areaValue = areaList[1];
        //     } else {
        //         areaValue = areaList[2];
        //     }
        // }

        // 方式
        filters.mode = newSelectValues.mode[0];
        //租金
        filters.price = newSelectValues.price[0];
        //筛选
        filters.more = newSelectValues.more.join(',')

        this.props.onFilter(filters);


        this.setState({
            openType: '',
            titleSelectedStatus: newTitlteSelectValues,
            selectedValues: newSelectValues
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
            characteristic,  //房屋亮点
            floor,  //楼层
            oriented,   //朝向
            roomType // 房屋类型
        }, selectedValues } = this.state;

        if (openType === 'more') {

            return <FilterMore

                onCancel={this.onCancel}
                onSave={this.onSave}

                defaultValue={selectedValues.more}
                data={{
                    characteristic,
                    floor,
                    oriented,
                    roomType
                }} />
        }

        return null;
    }


    renderMask() {

        const { openType } = this.state;

        let isShowMask = openType === 'area' || openType === 'mode' || openType === 'price';

        return (
            <Spring config={{ duration: 1000 }}
                from={{ opacity: 0 }}
                to={{ opacity: isShowMask ? 1 : 0 }}  >

                {props => {
                    return props.opacity === 0 ? null : <div style={props} className={styles.mask} onClick={this.onCancel} />;
                }}
            </Spring>
        )
    }

    render() {

        const { openType } = this.state;
        return (
            <div className={styles.root}>
                {/* 前三个菜单的遮罩层 */}
                {
                    this.renderMask()
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
