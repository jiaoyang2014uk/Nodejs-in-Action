//代码清单12-4 app类

import React from 'react';
import ReactDOM from 'react-dom';
// import Request from './request';
// import Response from './response';

class App extends React.Component {
    render () {
        return (
            <div>
                111
                {/* <Request />
                <Response /> */}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))