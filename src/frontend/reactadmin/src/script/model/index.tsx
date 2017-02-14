import * as React from "react";
import * as ReactDOM from "react-dom";
import { config } from "../config";
import * as desktop from "../component/desktop";
import { accountService } from "../service/account"
import { Login } from "./login";
import { Users } from "./user"
require("../../resource/style/common.css");
let style = require("../../resource/style/model/index.less");
class App extends React.Component<{ widgets: desktop.AppIcon[] }, {
    alerts?: { msg: string, className: string }[],
    renderCount?: number
}>{
    constructor() {
        super();
        let self = this;
        self.state = { alerts: [], renderCount: 0 };
        config.error = (msg, timeout) => {
            let pair = {
                msg: msg,
                className: "alert-danger"
            };
            self.state.alerts.push(pair);
            self.setState({ alerts: self.state.alerts });
            var index = setTimeout(() => {
                let tmp = self.state.alerts;
                let n = tmp.indexOf(pair);
                self.setState({ alerts: tmp.slice(0, n).concat(tmp.slice(n + 1, tmp.length)) });
                clearTimeout(index);
            }, timeout || 1000);
        };
    }
    render() {
        let self = this, errorBox: any;
        if (self.state.alerts) {
            errorBox = self.state.alerts.map((item, index) => <div key={index} style={{
                position: 'fixed',
                top: 55 * index + 20,
                right: 20,
                width: 500,
                zIndex: 9999999
            }} className={"alert alert-dismissible fade in " + item.className} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                <strong>{item.msg}</strong>
            </div>);
        }
        return <div style={{
            width: '100%',
            height: '100%'
        }}>
            {!accountService.isLogined() ? <div style={{
                position: 'fixed',
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.8)",
                zIndex: 9999993
            }}>
                <div style={{
                    padding: '10px',
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    borderRadius: 10,
                    background: "rgba(128, 128, 128, 1)",
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Login logined={() => self.forceUpdate()} />
                </div></div> : null}
            <desktop.Desktop appIcons={!accountService.isLogined() ? [] : self.props.widgets} showStartmenu={true} />
            {errorBox}
        </div>;
    }
}
(() => {
    document.body.removeChild(document.getElementById("precontainer"));
    document.body.removeChild(document.getElementById("preloading-style"));
    let root = document.createElement("div");
    root.style.width = "100%";
    root.style.height = "100%";
    document.body.appendChild(root);
    ReactDOM.render(<App widgets={[{
        text: "users",
        content: <Users />
    }]} />, root);
})();