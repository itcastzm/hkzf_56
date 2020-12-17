// 项目根组件   路由配置页面

import React from 'react'

import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom';

// 导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList';

export default function App() {
    return (
        <HashRouter>
            {/* <Button type="primary">点我</Button> */}
            {/* 路径和页面组件的关系 */}
            <Route path="/home" component={Home} />
            <Route path="/citylist" component={CityList} />
        </HashRouter>
    )
}
