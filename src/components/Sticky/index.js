import React, { Component } from 'react'

import './index.scss';

export default class Sticky extends Component {

    // constructor() {
    //     super();
    //     this.elRef = React.createRef();
    //     this.contentRef = React.createRef();
    // }
    // 非受控组件
    elRef = React.createRef();
    contentRef = React.createRef();


    handleScroll = () => {
        let el = this.elRef.current;
        let content = this.contentRef.current;

        let { top } = el.getBoundingClientRect();

        if (top > 0) {
            //    取消吸顶
            if (content.classList.contains('fiexd')) {
                el.style.height = 0;
                content.classList.remove('fiexd');
            }

        } else {
            // 吸顶
            if (!content.classList.contains('fiexd')) {
                el.style.height = 40;
                content.classList.add('fiexd');
            }
        }

    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    render() {
        return (
            <>
                {/* 占位元素 */}
                <div ref={this.elRef} ></div>
                {/* 被吸顶的组件 */}
                <div ref={this.contentRef}>
                    {this.props.children}
                </div>
            </>
        )
    }
}
