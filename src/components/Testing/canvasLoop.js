import React, { PureComponent } from "react";

export default (C, { refreshRate = 60 } = {}) => {
    class TL extends PureComponent {
        static displayName = `timeLoop(${C.displayName || C.name || ""})`;
        state = {
            time: 0,
            tick: 0
        };
        componentDidMount() {
            let startTime, lastTime;
            let interval = 1000 / refreshRate;
            lastTime = -interval;
            cancelAnimationFrame(window.__glReactDemoLoop);
            const loop = t => {
                window.__glReactDemoLoop = requestAnimationFrame(loop);
                if (!startTime) startTime = t;
                if (t - lastTime > interval) {
                    lastTime = t;
                    this.setState({
                        time: t - startTime,
                        tick: this.state.tick + 1
                    });
                }
            };
            window.__glReactDemoLoop = requestAnimationFrame(loop);
        }
        componentWillUnmount() {
            cancelAnimationFrame(window.__glReactDemoLoop);
        }
        render() {
            return <C {...this.props} {...this.state} />;
        }
    }
    return TL;
};
