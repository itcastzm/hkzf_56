import React, { Component } from 'react'
// 引入antd-mobile 组件
import { NavBar, Icon } from 'antd-mobile';

// 引入样式文件
import './index.scss';

export default class CityList extends Component {
    render() {
        return (
            <div className="citylist-wrapper">
                <NavBar
                    mode="light"
                    icon={<i className="iconfont icon-back"></i>}
                    onLeftClick={() => console.log('onLeftClick')}
                >城市选择</NavBar>
            </div>
        )
    }
}
