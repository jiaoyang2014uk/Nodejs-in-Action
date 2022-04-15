//代码清单12-6 response类

import React from 'react';
import Events from './app/events';
import Headers  from './app/headers';

class Response extends React.Component {
    constructor(props){
        super(props)
        this.state = {result: {}, tab: 'body'}
    }

    componentWillUnmount () {
        Events.removeListener('result', this.handleResult.bind(this))
    }

    componentDidMount () {
        Events.addListener('result', this.handleResult.bind(this))
    }

    handleResult () {
        this.setState({result: result})
    }

    handleSelectTab (e) {
        const tab = e.target.dataset.tab;
        this.setState({tab: tab})
    }

    render() {
        const result = this.state.result
        const tabClasses = {
            body: this.state.tab === 'body' ? 'active' : null,
            errors: this.state.tab === 'errors' ? 'active' : null,
        }
        const rawStyle = this.state.tab === 'body' ? null : {display: 'none'};
        const errorStyle = this.state.tab === 'errors' ? null : {display: 'none'};
        return(
            <div>
                <h1>Response<span>{result.response}</span></h1>
                <div>
                    <div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Header Name</th>
                                        <th>Header Value</th>
                                    </tr>
                                </thead>
                                <Headers result={result.headers}/>
                            </table>
                        </div>
                        <div>
                            <ul>
                                <li className={tabClasses.body}>
                                    <a data-tab='body' onClick={this.handleSelectTab}>Body</a>
                                </li>
                                <li className={tabClasses.errors}>
                                    <a data-tab='errors' onClick={this.handleSelectTab}>Errors</a>
                                </li>
                            </ul>
                            <div style={rawStyle}>{result.raw}</div>
                            <div style={errorStyle}>{result.error}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Response