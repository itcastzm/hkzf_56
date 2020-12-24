import React, { Component } from 'react'

// 导入轮播图组件
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';


import { getCurrentCityInfo } from '../../utils'

// 引入axios 

import API from '../../utils/api';
import { BASE_URL } from '../../utils/url'

import SearchHeader from '../../components/SearchHeader'


// 导入图片  格式是Base64格式 能够减少tcp请求
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



export default class Index extends Component {

    state = {
        swipers: [],
        groups: [],
        news: [],
        cityInfo: {}
    }
    componentDidMount() {
        // 请求轮播图数据
        this.getSwipersData();
        this.getGroups();
        this.getNewsData();
        this.getCityInfo();


        // var myCity = new window.BMap.LocalCity();

        // myCity.get(async (result) => {

        //     const res = await axios.get(`http://localhost:8080/area/info`, {
        //         params: {
        //             name: result.name
        //         }
        //     })

        //     this.setState({
        //         cityInfo: res.data.body
        //     })
        // });
    }

    async getCityInfo() {
        const cityInfo = await getCurrentCityInfo();
        this.setState({
            cityInfo
        });
    }

    async getSwipersData() {
        const res = await API.get(`/home/swiper`);

        this.setState({
            swipers: res.data.body
        });
    }

    // 获取租房小组数据
    async getGroups() {
        const res = await API.get(`/home/groups`, {
            params: {
                area: `AREA%7C88cff55c-aaa4-e2e0`
            }
        });

        this.setState({
            groups: res.data.body
        });
    }

    async getNewsData() {
        const res = await API.get(`/home/news`, {
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

        // 判断是否显示轮播图组件  主要目的 避免轮播图图片不切换的问题
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
                                src={`${BASE_URL}${val.imgSrc}`}
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

                    {/* 搜索框 */}
                    {/* <Flex className="search-box">
                        <Flex className="search">
                            <div className="location" onClick={() => this.props.history.push('/citylist')}>
                                {this.state.cityInfo.label || '上海'}
                                <i className="iconfont icon-arrow"></i>
                            </div>
                            <div className="form">
                                <i className="iconfont icon-seach"></i>
                                <span>请输入小区或地址</span>
                            </div>
                        </Flex>
                        <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')}></i>
                    </Flex> */}

                    <SearchHeader cityName={this.state.cityInfo.label}></SearchHeader>

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
                                        src={BASE_URL + item.imgSrc}
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
                    <WingBlank size="md">
                        {this.state.news.map((item) => (
                            <div className="news-item" key={item.id}>
                                <div className="img-wrap">
                                    <img alt="" src={BASE_URL + item.imgSrc} />
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
