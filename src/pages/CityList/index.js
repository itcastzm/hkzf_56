import React, { Component } from 'react'
// 引入antd-mobile 组件
import { NavBar } from 'antd-mobile';

import axios from 'axios';

// 引入样式文件
import './index.scss';


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

    componentDidMount() {
        this.getCityListData();
    }


    async getCityListData() {
        const res = await axios.get(`http://localhost:8080/area/city?level=1`);

        // 将请求到的数据  处理成可以渲染的结构
        const { cityIndex, cityObj } = formatCityListData(res.data.body);

        console.log(cityIndex, cityObj);
    }

    render() {
        return (
            <div className="citylist-wrapper">
                <NavBar
                    mode="light"
                    icon={<i className="iconfont icon-back"></i>}
                    onLeftClick={() => this.props.history.go(-1)}
                >城市选择</NavBar>
            </div>
        )
    }
}
