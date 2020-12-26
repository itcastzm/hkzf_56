import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

import { Route } from 'react-router-dom';


import './index.css';

// 导入子页面
// 小首页
const Index = React.lazy(() => import('../Index'));
// 找房
const Rent = React.lazy(() => import('../Rent'));
const News = React.lazy(() => import('../News'));
const Profile = React.lazy(() => import('../Profile'));


const navs = [
    { title: '首页', icon: 'icon-ind', path: '/home' },
    { title: '找房', icon: 'icon-findHouse', path: '/home/rent' },
    { title: '资讯', icon: 'icon-infom', path: '/home/news' },
    { title: '我的', icon: 'icon-myinfo', path: '/home/my' },
];

export default class Home extends Component {

    render() {

        // location  history  match
        const { location: {
            pathname
        } } = this.props;

        return (
            // 推荐在每一个  页面级 或者功能组件 最外层设定一个 包裹 样式类
            <div className="home">

                <Route exact path="/home" component={Index} />
                <Route path="/home/rent" component={Rent} />
                <Route path="/home/news" component={News} />
                <Route path="/home/my" component={Profile} />

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#21b97a"
                    barTintColor="white"
                    noRenderContent
                >
                    {navs.map(item => (
                        <TabBar.Item
                            icon={<i className={`iconfont ${item.icon}`}></i>}
                            selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
                            title={item.title}
                            key={item.path}
                            selected={pathname === item.path}
                            onPress={() => this.props.history.push(item.path)}
                        />
                    ))}
                </TabBar>
            </div>
        );
    }
}
