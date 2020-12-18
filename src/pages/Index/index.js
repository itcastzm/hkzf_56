import React, { Component } from 'react'

// 导入轮播图组件
import { Carousel, WingBlank } from 'antd-mobile';


export default class Index extends Component {

    state = {
        data: ['1', '2', '3'],
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }


    render() {
        return (
            <div>
                <Carousel
                    autoplay={true}
                    autoplayInterval={1000}
                    infinite
                // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="http://itcast.cn/"
                            style={{ display: 'inline-block', width: '100%', height: 212 }}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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
            </div>
        )
    }
}
