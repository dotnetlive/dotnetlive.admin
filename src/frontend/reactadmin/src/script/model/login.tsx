import * as React from "react";
import { accountService } from "../service/account"
export class Login extends React.Component<{
    logined: () => void
}, {
        username?: string,
        password?: string,
        checked?: boolean,
        city?: string
    }> {
    private userLoginInfoStorage = localStorage
    private userLoginInfoStorageKey = "current-userLoginInfo-key"
    refs: {
        [key: string]: (Element);
        username: HTMLInputElement
        password: HTMLInputElement
        rememberme: HTMLInputElement
    }
    constructor() {
        super();
        var info = JSON.parse(this.userLoginInfoStorage.getItem(this.userLoginInfoStorageKey)) as {
            username: string,
            password: string
        };
        this.state = {
            username: info ? info.username : '',
            password: info ? info.password : '',
            city: "",
            checked: true
        };
    }
    logined(token: string) {
        if (token) {
            if (this.refs.rememberme.checked) {
                this.userLoginInfoStorage.setItem(this.userLoginInfoStorageKey, JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }));
            } else {
                this.userLoginInfoStorage.removeItem(this.userLoginInfoStorageKey);
            }
            this.props.logined && this.props.logined();
        }
    }
    handleChange() {
        this.setState({
            username: this.refs.username.value,
            password: this.refs.password.value
        })
    }
    render() {
        let self = this;
        return <div style={{
            width: '300px',
            height: '180px',
            padding: '5px',
            border: '1px solid #000',
            borderRadius: 5,
            margin: '0 auto',
        }}>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <div style={{
                margin: '5px -5px',
                borderTop: '1px solid #000'
            }}></div>
            <div className="input-group" >
                <span className="input-group-addon"  ><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className="form-control" ref="username" maxLength={15}
                    placeholder="username" defaultValue={self.state.username}
                    onChange={e => self.handleChange()} />
            </div>
            <div className="input-group" style={{ marginTop: "10px" }}>
                <span className="input-group-addon"  ><i className="fa fa-key fa-fw"></i></span>
                <input type="password" ref="password" className="form-control" maxLength={15} defaultValue={this.state.password}
                    placeholder="password"
                    onChange={e => self.handleChange()} />
            </div>
            <button className={"btn btn-success"}
                disabled={!(self.state.username.trim().length > 4 && self.state.password.trim().length > 5)}
                style={{
                    width: 120,
                    height: 32,
                    marginTop: 5,
                    marginLeft: 80
                }} onClick={e => {
                    if (!(self.state.username.trim().length > 4 && self.state.password.trim().length > 5)) return;
                    accountService.login(self.state.username.trim(), self.state.password.trim(), r => {
                        if (r.token) self.props.logined && self.props.logined();
                    });
                }} >Login</button>
        </div>;
    }
}