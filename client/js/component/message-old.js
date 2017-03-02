import React, { Component } from 'react';

const POLL_URL = 'https://localhost:3001';
const POLL_INTERVAL = 1000;

class Message extends Component {
    constructor() {
        super();

        this.state = {
            message: null
        };

        this.pollTimer = null;
    }


    // Lifecycle
    componentDidMount() {
        this.pollingStart();
    }

    componentWillUnmount() {
        this.pollingStop();
    }


    // Helper
    pollingStart() {
        this.pollTimer = setInterval(() => { // eslint-disable-line
            fetch(POLL_URL)
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        message: response.randomString
                    });
                });
        }, POLL_INTERVAL);
    }

    pollingStop() {
        clearInterval(this.pollTimer);
    }


    // Render
    render() {
        let { message } = this.state;

        return (
            <div>
                <h1>{message}</h1>
                <div className="buttons">
                    <button onClick={this.pollingStart.bind(this)}>Start</button>
                    <button onClick={this.pollingStop.bind(this)}>Stop</button>
                </div>
                <p><small>old</small></p>
            </div>
        );
    }
}

export default Message;
