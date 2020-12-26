import React, { Component } from 'react'

import { Spring } from 'react-spring/renderprops';
export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h3>404页面</h3>
                <Spring
                    config={{
                        duration: 1000
                    }}
                    from={{ opacity: 0 }}
                    to={{ opacity: 1 }}>
                    {props => {
                        console.log(props);
                        return <h1 style={props}>hello</h1>
                    }}
                </Spring>
            </div>
        )
    }
}
