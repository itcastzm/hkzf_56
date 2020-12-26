// 项目根组件   路由配置页面

import React, { Suspense } from 'react'

import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

// 导入页面组件
const Home = React.lazy(() => import('./pages/Home'));
const CityList = React.lazy(() => import('./pages/CityList'));

const MyMap = React.lazy(() => import('./pages/MyMap'));

const HouseDetail = React.lazy(() => import('./pages/HouseDetail'));

const NotFound = React.lazy(() => import('./pages/NotFound'));

export default function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HashRouter>
                <Switch>
                    {/* <Button type="primary">点我</Button> */}
                    {/* 路径和页面组件的关系 */}
                    <Route exact path="/" render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={Home} />
                    <Route path="/house/:id" component={HouseDetail} />
                    <Route path="/citylist" component={CityList} />
                    <Route path="/map" component={MyMap} />
                    <Route path="*" component={NotFound} />

                </Switch>
            </HashRouter>
        </Suspense>
    )
}
