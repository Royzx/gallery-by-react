require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            uNameHelp:''
        }
    }

    changeUserName(e) {
        let uName = e.target.value;
        this.setState({
            userName:uName
        })
    }

    handleClik() {
        if(this.state.userName === '' || this.state.userName === null) {
            this.setState({
                uNameHelp:'用户名不能为空哦'
            })
        } else {
            
            console.log(this.state.userName);
            if(this.state.userName == 'Royzx') {
                this.props.history.push('/APP')
            }
        }
    }

    render() {
        return (
            <div className="login-box">
                <div className="login-title">登 录</div>
                <form action="" className="form-horizontal">
                    <div className="form-group imput-text">
                        <label htmlFor="uname">账户</label>
                        <input type="text" className="form-control" name="username" id="uname" ref="uname" placeholder="用户名" onChange={this.changeUserName.bind(this)}/>
                        <span className="help-block">{this.state.uNameHelp}</span>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={this.handleClik.bind(this)} className="login-btn">登录</button>
                    </div>
                </form>
            </div>
        )
    }
    
}
