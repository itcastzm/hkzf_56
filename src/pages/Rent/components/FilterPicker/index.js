import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {

    state = {
        value: []
    }

    handleChange = (val) => {
        // console.log(val, 'val');
        this.setState({
            value: val
        });
    }

    onCancel = () => {
        this.props.onCancel();
    }

    onOk = () => {
        this.props.onSave(this.props.type, this.state.value);
    }

    render() {

        return (
            <>
                {/* 选择器组件： */}
                {/* ref 代表非受控组件   受控组件  */}
                <PickerView data={this.props.data} value={this.state.value} cols={this.props.cols} onChange={this.handleChange} />

                {/* 底部按钮 */}
                <FilterFooter onCancel={this.onCancel} onOk={this.onOk} />
            </>
        )
    }
}
