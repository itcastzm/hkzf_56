import React from 'react'
import { NavBar } from 'antd-mobile';
// 路由的高阶组件
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import './index.scss';

function NavHeader({ history, onLeftClick, children, rightContent }) {

    //默认值  点击左侧图标效果
    const defaultHandle = () => history.go(-1);

    return (
        <NavBar
            className="navheader-comp"
            mode="light"
            icon={<i className="iconfont icon-back"></i>}
            onLeftClick={onLeftClick || defaultHandle}
            rightContent={rightContent}
        >{children}</NavBar>
    )
}


NavHeader.propTypes = {
    children: PropTypes.node,
    onLeftClick: PropTypes.func
}

// 处理路由对象
export default withRouter(NavHeader)
