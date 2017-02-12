import { config } from "../config"
export function ajax<T>(action: string, method: string, data: any, callback: (data: T, message?: string) => void) {
    var request = new XMLHttpRequest();
    var url = action;
    if (method.toLowerCase() == "get" && !!data) {
        let array = [];
        for (let key in data) array.push(key + "=" + data[key])
        if (array.length > 0) url += "?" + array.join("&");
    }
    request.open(method, url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            let json = request.responseText;
            config.loading(false);
            if (request.status == 200) {
                let result = JSON.parse(json) as { message: string, data: T };
                if (result.message) {
                    if (callback && callback.length == 2)
                        callback && callback(undefined, result.message);
                    else config.error(result.message);
                }
                else callback && callback(result.data);
            } else if (request.status == 500) {
                config.error("Server Error");
            } else if (request.status == 401) {
                config.error("Unauthorized");
            } else if (request.status == 400) {
                config.error("Bad Request");
            }
        }
    };
    config.loading(true);
    try {
        if (data) request.send(JSON.stringify(data));
        else request.send();
    } catch (e) {
        config.loading(false);
        callback && callback(undefined, "Server Error");
    }
}