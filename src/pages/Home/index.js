import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

import { Route } from 'react-router-dom';


import './index.css';

// 导入子页面
// 小首页
import Index from '../Index';
// 找房
import Rent from '../Rent';
import News from '../News';
import Profile from '../Profile';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
        };
    }

    render() {
        return (

            <div className="home">
                <Route path="/home/index" component={Index} />
                <Route path="/home/rent" component={Rent} />
                <Route path="/home/news" component={News} />
                <Route path="/home/profile" component={Profile} />

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#21b97a"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="Life"
                        icon={<i className="iconfont icon-ind"></i>}
                        selectedIcon={<i className="iconfont icon-ind"></i>}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                        }}
                        data-seed="logId"
                    >
                        {/* {this.renderContent('Life')} */}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-findHouse"></i>}
                        selectedIcon={<i className="iconfont icon-findHouse"></i>}
                        title="找房"
                        key="Koubei"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId1"
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-infom"></i>}
                        selectedIcon={<i className="iconfont icon-infom"></i>}
                        title="资讯"
                        key="Friend"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className="iconfont icon-myinfo"></i>}
                        selectedIcon={<i className="iconfont icon-myinfo"></i>}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'yellowTab',
                            });
                        }}
                    >

                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
