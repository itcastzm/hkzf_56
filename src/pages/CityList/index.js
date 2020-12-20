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





/*
  1 将获取到的 cityObj 和 cityIndex  添加为组件的状态数据。
  2 修改 List 组件的 rowCount 为 cityIndex 的长度。
  3 将 rowRenderer 函数，添加到组件中，以便在函数中获取到状态数据 cityObj 和 cityIndex。
  4 修改 List 组件的 rowRenderer 为组件中的 rowRenderer 方法。
  5 修改 rowRenderer 方法中渲染的每行结构和样式。
  6 修改 List 组件的 rowHeight 为函数，动态计算每一行的高度（因为每一行高度都不相同）。

  <div key={key} style={style} className="city">
    <div className="title">S</div>
    <div className="name">上海</div>
  </div>
*/


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


const titleHeight = 36;
const nameHeight = 50;
export default class CityList extends Component {

    state = {
        cityIndex: [],
        cityObj: {},
        curIndex: 0
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


    getRowHeight = ({ index }) => {
        let { cityIndex, cityObj } = this.state;
        let letter = cityIndex[index];
        let list = cityObj[letter];
        return titleHeight + nameHeight * list.length;
    }

    rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) => {
        let { cityIndex, cityObj } = this.state;
        let letter = cityIndex[index];
        let list = cityObj[letter];
        let label = '';

        switch (letter) {
            case '#':
                label = '当前定位';
                break;
            case 'hot':
                label = '热门城市';
                break;
            default:
                label = letter.toUpperCase();
        }

        return (
            <div key={key} style={style} className="city">
                <div className="title">{label}</div>
                {list.map((item) => (
                    <div className="name" key={item.value}>{item.label}</div>
                ))}
            </div>
        );
    }

    renderCityIndex() {

        let { curIndex } = this.state;

        return this.state.cityIndex.map((le, i) => {
            let clsStr = `${curIndex === i ? 'index-active' : ' '}`;

            return (
                <li key={i} className="city-index-item">
                    <span className={clsStr}>{le === 'hot' ? '热' : le.toUpperCase()}</span>
                </li>
            );
        });
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
                                rowCount={this.state.cityIndex.length}
                                rowHeight={this.getRowHeight}
                                rowRenderer={this.rowRenderer}
                            />
                        )
                    }
                </AutoSizer>

                {/* 右侧索引列表 */}
                {/* 
                    1 封装 renderCityIndex 方法，用来渲染城市索引列表。
                    2 在方法中，获取到索引数组 cityIndex ，遍历 cityIndex ，渲染索引列表。
                    3 将索引 hot 替换为 热。
                    4 在 state 中添加状态 activeIndex ，指定当前高亮的索引。
                    5 在遍历 cityIndex 时，添加当前字母索引是否高亮的判断条件。
                    */}
                <ul className="city-index">
                    {this.renderCityIndex()}
                </ul>

            </div>
        )
    }
}
