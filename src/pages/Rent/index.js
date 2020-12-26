import React, { Component } from 'react';

import SearchHeader from '../../components/SearchHeader';

import { Flex } from 'antd-mobile';

import { getCurrentCityInfo } from '../../utils'

import API from '../../utils/api';

import { BASE_URL } from '../../utils/url'
import { List, AutoSizer, WindowScroller } from 'react-virtualized';

import styles from './index.module.scss';

import Filter from './components/Filter';

import HouseItem from '../../components/HouseItem';

export default class Rent extends Component {


    state = {
        cityInfo: {},
        houseList: [],
        count: 0
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

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        let { houseList } = this.state;
        let house = houseList[index];

        return <HouseItem
            key={key}
            style={style}
            src={BASE_URL + house.houseImg}
            title={house.title}
            desc={house.desc}
            tags={house.tags}
            price={house.price}
        />;
    }
    render() {

        return (
            <div className={styles.root}>
                <Flex className={styles.heander}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
                    <SearchHeader cityName={this.state.cityInfo.label} className={styles.searchHeader}></SearchHeader>
                </Flex>

                <Filter onFilter={this.onFilter} />

                <div className={styles.houseItem}>
                    {/* 房源列表 */}
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <AutoSizer>
                                {({ width }) => (
                                    <List
                                        autoHeight
                                        width={width}
                                        height={height}
                                        rowCount={this.state.count}
                                        isScrolling={isScrolling}
                                        onScroll={onChildScroll}
                                        scrollTop={scrollTop}
                                        rowHeight={120}
                                        rowRenderer={this.rowRenderer}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                </div>
            </div>
        )
    }
}
