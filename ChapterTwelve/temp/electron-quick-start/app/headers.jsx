//代码清单12-7 headers组件

import React from 'react';

class Headers extends React.Component {
    render() {
        const headers = this.props.headers || {};
        const headerRows = Object.keys(headers).map((key, i)=>{
            return (
                <tr key={i}>
                    <td>{key}</td>
                    <td>{headers[key]}</td>
                </tr>
            )
        })
        return(
            <tbody>
                {headerRows}
            </tbody>
        )
    }
}

export default Headers