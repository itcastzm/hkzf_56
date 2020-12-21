import React, { Component } from 'react';
import NavHeader from '../../components/NavHeader';

// Set  
// Map 

// import './index.scss';

// css moudle 样式文件加载是通过webpack  css loader 插件处理的
import styles from './index.module.scss';

export default class MyMap extends Component {

    componentDidMount() {
        var map = new window.BMap.Map("container");
        var point = new window.BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    }


    render() {
        return (
            <div className={styles.map}>
                <NavHeader >地图找房</NavHeader>
                <div id="container" className={styles.container} ></div>
            </div>
        )
    }
}
