import React, { Component } from 'react';

class ScrollDownButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.checkWindowScroll.bind(this));
    }


    componentWillUnmount() {
        window.removeEventListener("scroll", this.checkWindowScroll.bind(this));
    }

    checkWindowScroll() {
        if(window.pageYOffset > 110) {
            this.setState({
                visible: false
            })
        } else if(window.pageYOffset <= 110) {
            this.setState({
                visible: true
            })
        }
        // > 100
    }

    render() {
        let style = this.state.visible ? {right: 20, opacity: 1} : {right: -75, opacity: 0};

        return (
            <aside role="button"
                className={"scrollDownBtn"}
                style={style}
                onClick={() => window.scrollTo(0, window.outerHeight + 1000)}
            >
                <svg viewBox="-32 -32 32 32"><path transform="rotate(180)" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path></svg>
            </aside>
        )
    }
}

export default ScrollDownButton;