import React, { Component } from 'react'

// 导入轮播图组件
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';

// 引入axios 
import axios from 'axios';

// 导入图片
import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';


import './index.scss';


const navs = [
    { img: Nav1, title: '整租', 'path': '/home/rent' },
    { img: Nav2, title: '合租', 'path': '/home/rent' },
    { img: Nav3, title: '地图找房', 'path': '/map' },
    { img: Nav4, title: '去出租', 'path': '/rent' },
];


const data = Array.from(new Array(9)).map((_val, i) => ({
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: `name${i}`,
}));

export default class Index extends Component {

    state = {
        swipers: [],
        groups: [],
        news: []
    }
    componentDidMount() {
        // 请求轮播图数据
        this.getSwipersData();
        this.getGroups();
        this.getNewsData();
    }

    async getSwipersData() {
        const res = await axios.get(`http://localhost:8080/home/swiper`);

        this.setState({
            swipers: res.data.body
        });
    }

    // 获取租房小组数据
    async getGroups() {
        const res = await axios.get(`http://localhost:8080/home/groups`, {
            params: {
                area: `AREA%7C88cff55c-aaa4-e2e0`
            }
        });

        this.setState({
            groups: res.data.body
        });
    }

    async getNewsData() {
        const res = await axios.get(`http://localhost:8080/home/news`, {
            params: {
                area: 'AREA%7C88cff55c-aaa4-e2e0'
            }
        });

        this.setState({
            news: res.data.body
        });
    }

    // 渲染轮播图
    renderSwipers() {

        if (this.state.swipers.length) {
            return (
                <Carousel
                    autoplay={true}
                    autoplayInterval={1000}
                    infinite
                >
                    {this.state.swipers.map(val => (
                        <a
                            key={val.id}
                            href="http://itcast.cn/"
                            style={{ display: 'inline-block', width: '100%', height: 212 }}
                        >
                            <img
                                src={`http://localhost:8080${val.imgSrc}`}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            )
        }

        return null;
    }

    // 导航区
    renderNavs() {
        return (
            <Flex className="flex-nav">
                { navs.map((item, i) => (
                    // flex: 1
                    <Flex.Item key={i} onClick={() => this.props.history.push(item.path)}>
                        <img src={item.img} alt="nav" />
                        <h3>{item.title}</h3>
                    </Flex.Item>
                ))}
            </Flex>
        )
    }

    render() {
        return (
            <div className="index-wrapper">

                {/* 轮播图区域 */}
                <div className="swiper-area">
                    {this.renderSwipers()}
                </div>

                {/* 导航区 */}
                <div className="navs">
                    {this.renderNavs()}
                </div>

                {/* 租房小组     */}
                <div className="group">
                    <h3 className="group-title">
                        租房小组<span className="more">更多</span>
                    </h3>
                    <Grid data={this.state.groups} activeStyle={true}
                        columnNum={2}
                        hasLine={false}
                        square={false}
                        renderItem={
                            item => (
                                <Flex className="group-item" justify="around">
                                    <div className="desc">
                                        <p className="title">{item.title}</p>
                                        <span className="info">{item.desc}</span>
                                    </div>
                                    <img
                                        src={'http://localhost:8080' + item.imgSrc}
                                        alt=""
                                    />
                                </Flex>
                            )
                        }
                    />
                </div>


                {/* 最新资讯 */}
                <div className="news">
                    <h3 className="group-title">
                        最新资讯
                    </h3>
                    <WingBlank>
                        {this.state.news.map((item) => (
                            <div className="news-item">
                                <div className="img-wrap">
                                    <img alt="" src={'http://localhost:8080' + item.imgSrc} />
                                </div>
                                <Flex className="content" direction="column" justify="between" >
                                    <div className="title">{item.title}</div>
                                    <Flex className="desc" justify="between">
                                        <span>{item.from}</span>
                                        <span>{item.date}</span>
                                    </Flex>
                                </Flex>
                            </div>
                        ))}
                    </WingBlank>

                </div>
            </div>
        )
    }
}
