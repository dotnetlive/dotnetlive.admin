import * as React from "react";
import * as ReactDOM from "react-dom";
class App extends React.Component<{}, {}>{
    render() {
        let self = this;
        return <div>    
            
        </div>
    }
}
(() => {
    document.body.removeChild(document.getElementById("precontainer"));
    document.body.removeChild(document.getElementById("preloading-style"));
    let root = document.createElement("div");
    root.style.width = "100%";
    root.style.height = "100%";
    document.body.appendChild(root);
    ReactDOM.render(<App />, root);
})();