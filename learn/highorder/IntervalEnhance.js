/*什么是high-order？

详情见 http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html

*/

import React from 'react'

//return了一个class，也就是说IntervalEnhance是一个class
export var IntervalEnhance = ComposedComponent => class extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            seconds: 0
        }
    }

    componentDidMount() {
        this.setState({
            seconds: this.props.start || 0
        });
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({
            seconds: this.state.seconds + 1000
        })
    }

    render() {

        return (
            <ComposedComponent
                {...this.props}
                {...this.state}
            />
        )
    }
};
