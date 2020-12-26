import React, { Component } from 'react';

import SearchHeader from '../../components/SearchHeader';

import { Flex } from 'antd-mobile';

import { getCurrentCityInfo } from '../../utils'

import API from '../../utils/api';

import { BASE_URL } from '../../utils/url'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized';

import styles from './index.module.scss';

import Filter from './components/Filter';

import Sticky from '../../components/Sticky'

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
        //houseList.length  20   row 1592
        let house = houseList[index];

        if (!house) {
            return (
                <div style={style} key={key}>
                    <p className={styles.loading}>
                        加载中...
                    </p>
                </div>
            )
        }


        return <HouseItem
            onClick={() => this.props.history.push(`/house/${house.houseCode}`)}
            key={key}
            style={style}
            src={BASE_URL + house.houseImg}
            title={house.title}
            desc={house.desc}
            tags={house.tags}
            price={house.price}
        />;


    }

    // 告诉无限加载组件  是否已经加载了
    // 该返回需要返回一个布尔值
    isRowLoaded = ({ index }) => {
        //!!undefined
        return !!this.state.houseList[index];
    }

    loadMoreRows = async ({ startIndex, stopIndex }) => {
        // return fetch(`path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`)
        //     .then(response => {
        //         // Store response data in list...
        //     })
        console.log(startIndex, stopIndex);


        const cityInfo = await getCurrentCityInfo();
        return new Promise((resolve, reject) => {

            API.get(`/houses`, {
                params: {
                    cityId: cityInfo.value,
                    start: startIndex,
                    end: stopIndex,
                    ...this.filters
                }
            }).then((res) => {

                this.setState({
                    houseList: [...this.state.houseList, ...res.data.body.list],
                    count: res.data.body.count
                });

                resolve();

            })

        })
    }

    render() {

        return (
            <div className={styles.root}>
                <Flex className={styles.heander}>
                    <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
                    <SearchHeader cityName={this.state.cityInfo.label} className={styles.searchHeader}></SearchHeader>
                </Flex>

                <Sticky height={40}>
                    <Filter onFilter={this.onFilter} />
                </Sticky>

                <div className={styles.houseItem}>
                    {/* 房源列表 */}
                    <InfiniteLoader
                        isRowLoaded={this.isRowLoaded}
                        loadMoreRows={this.loadMoreRows}
                        rowCount={this.state.count}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <WindowScroller>
                                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                                    <AutoSizer>
                                        {({ width }) => (
                                            <List
                                                autoHeight  //List的高度需要根据外面的组件的高度来调整
                                                width={width}
                                                height={height}
                                                rowCount={this.state.count}
                                                isScrolling={isScrolling}
                                                onScroll={onChildScroll}
                                                scrollTop={scrollTop}
                                                rowHeight={120}
                                                rowRenderer={this.rowRenderer}
                                                onRowsRendered={onRowsRendered}
                                                ref={registerChild}
                                            />
                                        )}
                                    </AutoSizer>
                                )}
                            </WindowScroller>
                        )}
                    </InfiniteLoader>
                </div>
            </div>
        )
    }
}
