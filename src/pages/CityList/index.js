import React, { Component } from 'react'
// 引入antd-mobile 组件
import { NavBar } from 'antd-mobile';

import axios from 'axios';

// 引入List组件
// https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md
// https://github.com/bvaughn/react-virtualized
import { List, AutoSizer } from 'react-virtualized';

import { getCurrentCityInfo } from '../../utils';

// 引入样式文件
import './index.scss';

// List data as an array of strings
const list = [
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    'Brian Vaughn',
    // And so on...
];

function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
}) {
    return (
        <div key={key} style={style}>
            {list[index]}
        </div>
    );
}


function formatCityListData(list) {
    const cityObj = {};

    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let p = item.short.substr(0, 1);
        if (cityObj[p]) {
            cityObj[p].push(item);
        } else {
            cityObj[p] = [item];
        }
    }

    // 渠道cityObj  所有属性名(key) 然后排序  排序按照字母大小排序
    let cityIndex = Object.keys(cityObj).sort();

    return {
        cityObj,
        cityIndex
    }

}

export default class CityList extends Component {

    state = {
        cityIndex: [],
        cityObj: {}
    }

    componentDidMount() {
        this.getCityListData();
    }


    async getCityListData() {
        const res = await axios.get(`http://localhost:8080/area/city?level=1`);

        // 将请求到的数据  处理成可以渲染的结构
        const { cityIndex, cityObj } = formatCityListData(res.data.body);

        // 获取热门城市数据
        const hotRes = await axios.get(`http://localhost:8080/area/hot`);

        // 处理热门城市数据
        cityIndex.unshift('hot');
        cityObj.hot = hotRes.data.body;

        // 处理当前定位城市数据
        const curCityInfo = await getCurrentCityInfo();

        cityIndex.unshift('#');
        cityObj['#'] = [curCityInfo];

        this.setState({
            cityIndex,
            cityObj
        })
    }

    render() {
        return (
            <div className="citylist-wrapper">
                <NavBar
                    mode="light"
                    icon={<i className="iconfont icon-back"></i>}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>

                {/* AutoSizer 用来设定 宽度和高度 */}
                <AutoSizer>
                    {
                        ({ height, width }) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={list.length}
                                rowHeight={50}
                                rowRenderer={rowRenderer}
                            />
                        )
                    }
                </AutoSizer>
            </div>
        )
    }
}
