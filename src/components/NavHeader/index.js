import React from 'react'
import { NavBar } from 'antd-mobile';

import './index.scss';

export default function NavHeader(props) {
    return (
        <NavBar
            className="navheader-comp"
            mode="light"
            icon={<i className="iconfont icon-back"></i>}
            onLeftClick={() => props.history.go(-1)}
        >{props.title}</NavBar>
    )
}
