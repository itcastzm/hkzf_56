// 项目根组件   路由配置页面

import React from 'react'

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

// 导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList';

import NotFound from './pages/NotFound';

export default function App() {
    return (
        <HashRouter>
            <Switch>
                {/* <Button type="primary">点我</Button> */}
                {/* 路径和页面组件的关系 */}
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/home" component={Home} />
                <Route path="/citylist" component={CityList} />

                <Route path="*" component={NotFound} />
            </Switch>
        </HashRouter>
    )
}
