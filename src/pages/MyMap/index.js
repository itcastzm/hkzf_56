import React, { Component } from 'react';
import NavHeader from '../../components/NavHeader';

// Set  
// Map 

import './index.scss';

export default class MyMap extends Component {

    componentDidMount() {
        var map = new window.BMap.Map("container");
        var point = new window.BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    }


    render() {
        return (
            <div className="map">
                <NavHeader title="地图找房"></NavHeader>
                <div id="container"></div>
            </div>
        )
    }
}
