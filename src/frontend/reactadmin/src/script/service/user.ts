import { ajax } from "../tool/ajax";
import { config } from "../config"
export interface User {
    username: string
}
import { accountService } from "./account"
class UserService {
    getUsers(callback: (users: User[]) => void) {
        if (!accountService.isLogined()) return;
        if (config.debugMode) {
            callback([{ username: "codemonk" }, { username: "tom" }, { username: "canglaoshi" }]);
        } else {
            ajax<User[]>("/api/users", "GET", {}, (users) => callback(users))
        }
    }
}
export let userService = new UserService();