import React, { Component } from 'react';
import NavHeader from '../../components/NavHeader';
import { getCurrentCityInfo } from '../../utils'

// Set  
// Map 

// import './index.scss';

// css moudle 样式文件加载是通过webpack  css loader 插件处理的
import styles from './index.module.scss';

export default class MyMap extends Component {

    async componentDidMount() {
        // 1. 让地图展示当前城市
        const cityInfo = await getCurrentCityInfo();

        var map = new window.BMap.Map("container");
        // 创建地址解析器实例     
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(cityInfo.label, function (point) {

            if (point) {
                // 2. 设置地图的缩放级别为11
                map.centerAndZoom(point, 11);
                // 3. 添加比例尺和平移缩放控件
                // 添加平移缩放控件
                map.addControl(new window.BMap.NavigationControl());
                // 添加比例尺
                map.addControl(new window.BMap.ScaleControl());

            }
        }, cityInfo.label);




    }


    render() {
        return (
            // BEM 文件名   样式类名   哈希值
            <div className={styles.map}>
                <NavHeader >地图找房</NavHeader>
                <div id="container" className={styles.container} ></div>
            </div>
        )
    }
}
