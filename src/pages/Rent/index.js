import React, { Component } from 'react';

import SearchHeader from '../../components/SearchHeader';

import { Flex } from 'antd-mobile';

import { getCurrentCityInfo } from '../../utils'

import API from '../../utils/api';


import styles from './index.module.scss';

import Filter from './components/Filter';

export default class Rent extends Component {


    state = {
        cityInfo: {},
        houseList: []
    }

    filters = {}

    async componentDidMount() {
        const cityInfo = await getCurrentCityInfo();
        this.setState({
            cityInfo: cityInfo
        });

        this.getHouseList();
    }

    async getHouseList() {
        const cityInfo = await getCurrentCityInfo();
        const res = await API.get(`/houses`, {
            params: {
                cityId: cityInfo.value,
                start: 1,
                end: 20,
                ...this.filters
            }
        });


        this.setState({
            houseList: res.data.body.list,
            count: res.data.body.count
        })
    }

    onFilter = (filters) => {
        // console.log('filters:', filters);
        this.filters = filters;
        this.getHouseList();

    }

    render() {
        return (
            <div>
                <Flex className={styles.heander}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
                    <SearchHeader cityName={this.state.cityInfo.label} className={styles.searchHeader}></SearchHeader>
                </Flex>

                <Filter onFilter={this.onFilter} />
            </div>
        )
    }
}
