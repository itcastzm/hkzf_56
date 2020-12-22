import React, { Component } from 'react';
import NavHeader from '../../components/NavHeader';
import { getCurrentCityInfo } from '../../utils';

import axios from 'axios';

// Set  
// Map 

// import './index.scss';

// css moudle 样式文件加载是通过webpack  css loader 插件处理的
import styles from './index.module.scss';

const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255,0,0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rbg(255,255,255)',
    textAlign: 'center'
};

export default class MyMap extends Component {

    componentDidMount() {

        this.initMap();
    }

    async initMap() {
        // 1. 让地图展示当前城市
        const cityInfo = await getCurrentCityInfo();

        var map = new window.BMap.Map("container");
        //将map实例存储在this上
        this.map = map;
        // 创建地址解析器实例     Leo  Lion
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(cityInfo.label, async (point) => {

            if (point) {
                // 2. 设置地图的缩放级别为11
                map.centerAndZoom(point, 11);
                // 3. 添加比例尺和平移缩放控件
                // 添加平移缩放控件
                map.addControl(new window.BMap.NavigationControl());
                // 添加比例尺
                map.addControl(new window.BMap.ScaleControl());

                // 调用渲染函数  发请求  遍历数据 渲染覆盖物
                this.renderOverlays(cityInfo.value);

            }
        }, cityInfo.label);
    }

    // 发请求  遍历数据 渲染覆盖物
    async renderOverlays(id) {

        //获取当前城市下的房源数据
        const res = await axios.get(`http://localhost:8080/area/map`, {
            params: {
                id: id
            }
        });

        const { type, nextZoom } = this.getTypeAndZoom();

        res.data.body.forEach((v, i, a) => {

            this.createOverlays(v, type, nextZoom);
        });

    }

    // 获取下一级地图的覆盖物 渲染的类型  和  地图的缩放级别
    getTypeAndZoom() {
        const zoom = this.map.getZoom();
        let type = 'circle';
        let nextZoom = 0;

        if (10 <= zoom && zoom < 12) {
            // 城市下的区这一级
            nextZoom = 13;
        } else if (12 <= zoom && zoom < 14) {
            //镇和村 级别
            nextZoom = 15;
        } else if (14 <= zoom < 16) {
            type = 'rect';
        }

        return {
            type,
            nextZoom
        }
    }


    // 渲染覆盖物
    createOverlays({ coord, count, label, value }, type, nextZoom) {

        if (type === 'circle') {
            // 创建圆形覆盖物
            this.createCircle(value, coord.longitude, coord.latitude, count, label, nextZoom);
        } else {
            // 创建方形覆盖物
            this.createReact(value, coord.longitude, coord.latitude, count, label);
        }
    }

    // 渲染圆形覆盖物
    createCircle(id, longitude, latitude, count, name, nextZoom) {

        const point = new window.BMap.Point(longitude, latitude);
        const opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new window.BMap.Size(-35, -35) // 设置文本偏移量
        };
        // 创建文本标注对象
        const label = new window.BMap.Label('', opts);
        // 自定义文本标注样式
        label.setStyle(labelStyle);

        label.setContent(`
                    <div  class="${styles.bubble}">
                        <p class="${styles.name}">${name}</p>
                        <p >${count}套</p>
                    </div>
                `)
        this.map.addOverlay(label);

        label.addEventListener('click', () => {

            // 1. 放大
            this.map.panTo(point);
            // 2. 把被点击的地方 移动地图中心位置
            this.map.setZoom(nextZoom);

            // this.map.centerAndZoom(point, nextZoom);

            // 3.清除原来的覆盖物
            // 解决百度地图bug
            setTimeout(() => {
                this.map.clearOverlays();
            }, 0)
            // 4. 加载新的覆盖物
            this.renderOverlays(id);
            console.log('被点击了!')
        })
    }
    // 渲染方形覆盖物
    createReact() {

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
