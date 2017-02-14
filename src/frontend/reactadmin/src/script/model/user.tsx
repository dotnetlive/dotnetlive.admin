import * as React from "react";
import { userService, User } from "../service/user"

export class Users extends React.Component<{}, {
    loading: boolean
    data: User[]
}>{
    constructor() {
        super();
        this.state = { loading: true, data: [] };
    }
    componentWillMount() {
        let self = this;
        userService.getUsers(users => self.setState({ data: users, loading: false }));
    }
    render() {
        let self = this;
        return <div style={
            { height: 400, width: 300, overflow: 'auto' }
        }>
            {
                self.state.loading ? <span>Loading...</span> : (
                    (self.state.data ? <ul className="list-group">{self.state.data.map((item, index) =>
                        <li key={index} className="list-group-item" style={{
                            cursor: 'pointer',
                            marginBottom: 0,
                            wordBreak: 'break-word'
                        }}>{item.username} </li>
                    )} </ul> : null)
                )
            }
        </div>
    }
}