import React, { Component } from 'react'
import Dashboard from '../dashboard'
import Header from '../header'

export default class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            functionData: (typeof props.location.state !== 'undefined') ? props.location.state.functionData : undefined,
            functionId: (typeof props.location.state !== 'undefined') ? props.location.state.functionId : undefined
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Dashboard functionData={this.state.functionData} functionId={this.state.functionId} />
            </div>
        )
    }
}
