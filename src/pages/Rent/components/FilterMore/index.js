import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
    state = {
        selectList: []
    }

    handleClick(item) {

        const { selectList } = this.state;
        if (selectList.indexOf(item.value) > -1) {
            //这个值 item.value 已经被选中了 那么需要取消选中
            let index = selectList.findIndex((key) => key === item.value);
            selectList.splice(index, 1);
        } else {
            // item.value这个值 没有被选中  那么可以选中
            selectList.push(item.value);
        }

        this.setState({
            selectList
        });
    }

    // 渲染标签
    renderFilters(list) {
        // 高亮类名： styles.tagActive

        return list.map(item => {
            let isSelected = this.state.selectList.indexOf(item.value) > -1;
            return <span key={item.value}
                onClick={this.handleClick.bind(this, item)}
                className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}
            >
                {item.label}
            </span>
        })

    }

    render() {

        const { characteristic, floor, oriented, roomType } = this.props.data;

        return (
            <div className={styles.root}>
                {/* 遮罩层 */}
                <div className={styles.mask} />

                {/* 条件内容 */}
                <div className={styles.tags}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

                        <dt className={styles.dt}>朝向</dt>
                        <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

                        <dt className={styles.dt}>楼层</dt>
                        <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

                        <dt className={styles.dt}>房屋亮点</dt>
                        <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
                    </dl>
                </div>

                {/* 底部按钮 */}
                <FilterFooter className={styles.footer} />
            </div>
        )
    }
}
