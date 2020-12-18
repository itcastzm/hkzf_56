import React, { Component } from 'react'

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
                <div id="container"></div>
            </div>
        )
    }
}
