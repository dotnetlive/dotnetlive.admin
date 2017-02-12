import * as React from "react";
import * as ReactDOM from "react-dom";
require('../../resource/style/component/widget.css');
export class Widget extends React.Component<{
    content?: JSX.Element,
    icon: string
    title: string,
    maximum?: boolean,
    covered?: boolean,
    zIndex?: number,
    show?: boolean,
    minimum?: boolean
    onSelected: (widget: Widget) => void,
    onClosd: (widget: Widget) => void,
    top?: number
    left?: number
}, {
        top?: number,
        left?: number,
        maxing?: boolean,
        hidden?: boolean
    }> {
    refs: {
        [key: string]: (Element);
        layer: HTMLDivElement
    }
    private innerOperation: boolean = false
    constructor() {
        super();
        this.state = {
            hidden: false
        };
    }
    private handleResizs() {
        let self = this;
        this.setState({
            maxing: !self.state.maxing,
            hidden: false
        });
    }
    private handleMin(e: MouseEvent) {
        let self = this;
        self.innerOperation = true;
        self.setState({
            hidden: true
        });
    }
    private handleClose() {
        let self = this;
        self.props.onClosd(self);
    }
    private handldeMouseMove(e: MouseEvent) {
        let self = this;
        if (self.moving) {
            let x = e.pageX - self.x;
            let y = e.pageY - self.y;
            let layer = ReactDOM.findDOMNode(self.refs.layer);
            let maxX = document.body.clientWidth - layer.clientWidth;
            let maxY = document.body.clientHeight - layer.clientHeight;
            x < 0 && (x = 0);
            y < 0 && (y = 0);
            x > maxX && (x = maxX);
            y > maxY && (y = maxY);
            this.setState({
                top: y,
                left: x
            });
        }
    }
    private handldeMouseDown(e: MouseEvent) {
        let self = this;
        self.props.onSelected(self);
        self.moving = true;
        self.x = e.pageX - self.state.left;
        self.y = e.pageY - self.state.top;
        let old = document.onmousemove;
        document.onmousemove = (ev) => self.handldeMouseMove.bind(self)(ev);
        document.onmouseup = (ev) => {
            self.moving = false;
            document.onmousemove = old;
        };
    }
    componentDidMount() {
        let self = this;
        let layer = ReactDOM.findDOMNode(self.refs.layer);
        let maxX = document.body.clientWidth - layer.clientWidth;
        let maxY = document.body.clientHeight - layer.clientHeight;
        let left = self.state.left, top = self.state.top;
        if (left < 0) left = 0;
        if (left > maxX) left = maxX;
        if (top < 0) top = 0;
        if (top > maxY) top = maxY;
        this.setState({
            top: top,
            left: left
        });
    }
    private moving = false
    private x: number
    private y: number
    render() {
        let self = this, left = self.state.left, top = self.state.top, hidden = self.state.hidden;
        if (top == undefined) top = 50;
        if (left == undefined) left = 50;
        let indexStyle: any = {};
        if (!self.innerOperation && self.state.hidden && self.props.show === true) hidden = false;
        if (self.innerOperation) self.innerOperation = undefined;
        indexStyle.visibility = hidden ? 'hidden' : 'visible';
        if (self.props.zIndex) {
            indexStyle.zIndex = self.props.zIndex;
        }
        return <div className={"widget-layer " + (self.state.maxing ? 'widget-full' : '')}
            style={indexStyle} onClick={e => self.props.onSelected(self)}>
            {
                self.props.covered ? <div className="widget-shade"></div> : null
            }
            <div className="widget-box show" ref="layer" style={{
                left: left,
                top: top
            }}>
                <div className={"widget-title " + (self.props.maximum ? "" : "widget-move")}
                    onMouseDown={e => self.handldeMouseDown.bind(self)(e)}>
                    <img src={self.props.icon || require("../../resource/image/default-app-icon.png")} alt={self.props.title} />
                    <span>{self.props.title}</span>
                </div>
                {
                    self.props.minimum == false ? null : <div className="widget-min widget-ico" onClick={e => self.handleMin.bind(self)(e)}></div>
                }
                <div className="widget-close widget-ico" onClick={e => self.handleClose.bind(self)()}></div>
                {
                    self.props.content ? <div className="widget-con">
                        {self.props.content}
                    </div> : null
                }
            </div>
        </div>;
    }
}