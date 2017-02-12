import { ajax } from "../tool/ajax";
import { config } from "../config"
interface LoginResponse {
    token: string
}
class AccountService {
    private setCookieItem(name: string, value: any, timeout?: number) {
        if (timeout) {
            let d = new Date();
            d.setTime(d.getTime() + (timeout * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            let s = value as string;
            if (!s) throw new Error('not support set object in cookie,please use string object');
            document.cookie = name + "=" + value + "; " + expires;
        } else {
            document.cookie = name + "=" + encodeURIComponent(value);
        }
    }
    login(name: string, password: string, callback: (response: LoginResponse) => void) {
        let self = this, handle = (token) => { self.setCookieItem("token", token); callback && callback({ token: token }) };
        if (config.debugMode) {
            handle("test-token");
        } else {
            ajax<LoginResponse>("/api/account/login", "GET", {}, (data) => handle(data.token));
        }
    }
}

export let accountService = new AccountService();