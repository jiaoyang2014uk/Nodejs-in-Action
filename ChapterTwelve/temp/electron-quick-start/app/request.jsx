//代码清单12-5 request类

import React  from 'react';
import Events from './events';

const request = require('@electron/remote').require('request')

class Request extends React.Component {
    constructor(props){
        super(props)
        this.state = {url: null, method: 'GET'}
    }

    handleChange (e) {
        const state = {}
        state[e.target.name] = e.target.value;
        this.setState(state)
    }

    makeRequest () {
        request(this.state, (err, res, body)=>{
            const statusCode = res ? res.statusCode : 'No Response'
            const result = {
                response: `${statusCode}`,
                raw: body? body: '',
                headers: res ? res.headers : [],
                error: err ? JSON.stringify(err, null, 2) : ''
            }
            Events.emit('result', result)
            new Notification(`HTTP response finished: ${statusCode}`)
        })
    }

    render() {
        return (
            <div>
                <h1>Request</h1>
                <div>
                    <div>
                        <label>URL</label>
                        <input name='url' type='url' value='this.state.url' onChange='this.handleChange' />
                    </div>
                    <div>
                        <label>Method</label>
                        <input name='method' type='text' value='this.state.method' onChange='this.handleChange' placeholder='GET, POST, DELETE, PUT, PATCH'/>
                    </div>
                    <div>
                        <a onClick='this.makeRequest'>Make request</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Request;