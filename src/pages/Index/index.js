import React, { Component } from 'react'

// 导入轮播图组件
import { Carousel, Flex } from 'antd-mobile';

// 引入axios 
import axios from 'axios';

// 导入图片
import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';


import './index.css';



export default class Index extends Component {

    state = {
        swipers: []
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);

        // 请求轮播图数据
        this.getSwipersData()
    }

    async getSwipersData() {
        const res = await axios.get(`http://localhost:8080/home/swiper`);

        this.setState({
            swipers: res.data.body
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
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            )
        }

        return null;
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
                    <Flex className="flex-nav">
                        <Flex.Item>
                            <img src={Nav1} alt="nav" />
                            <h3>整租</h3>
                        </Flex.Item>
                        <Flex.Item>
                            <img src={Nav2} alt="nav" />
                            <h3>合租</h3>
                        </Flex.Item>
                        <Flex.Item>
                            <img src={Nav3} alt="nav" />
                            <h3>地图找房</h3>
                        </Flex.Item>
                        <Flex.Item>
                            <img src={Nav4} alt="nav" />
                            <h3>去出租</h3>
                        </Flex.Item>
                    </Flex>
                </div>

            </div>
        )
    }
}
