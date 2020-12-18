import React, { Component } from 'react'

// 导入轮播图组件
import { Carousel, WingBlank } from 'antd-mobile';

// 引入axios 
import axios from 'axios';


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


    render() {
        return (
            <div>


                {this.state.swipers.length ? <Carousel
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
                </Carousel> : null}

            </div>
        )
    }
}
