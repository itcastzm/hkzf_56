import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {

    onCancel = () => {
        this.props.onCancel();
    }

    onOk = () => {
        this.props.onSave();
    }

    render() {

        return (
            <>
                {/* 选择器组件： */}
                <PickerView data={this.props.data} value={null} cols={this.props.cols} />

                {/* 底部按钮 */}
                <FilterFooter onCancel={this.onCancel} onOk={this.onOk} />
            </>
        )
    }
}
