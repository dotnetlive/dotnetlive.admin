import { ajax } from "../tool/ajax";
import { config } from "../config"
interface LoginResponse {
    token: string
}
class AccountService {
    private getCookieItem(name: string): any {
        let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    }
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
            if (name == "admin" && password == "123456") handle("test-token");
            else config.error("username or password error");
        } else {
            ajax<LoginResponse>("/api/account/login", "GET", { "name": name, "password": password }, (data) => handle(data.token));
        }
    }
    isLogined(): boolean {
        return !!this.getCookieItem("token");
    }
}

export let accountService = new AccountService();