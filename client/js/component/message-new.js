import { Observable } from 'rxjs/Observable';
import React, { Component } from 'react';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/takeUntil';

const POLL_URL = 'https://localhost:3001';
const POLL_INTERVAL = 1000;

const POLL = Observable
    .interval(POLL_INTERVAL)
    .concatMap(() => {
        return Observable.defer(() => {
            return fetch(POLL_URL)
                .then((response) => response.json());
        });
    });

class Message extends Component {
    constructor() {
        super();

        this.state = {
            message: null
        };

        this.polling = null;
    }


    // Lifecycle
    componentDidMount() {
        this.pollingStart();
    }

    componentWillUnmount() {
        this.pollingStop();
    }


    // Helpers
    pollingStart() {
        this.polling = POLL.subscribe(({ randomString }) => {
            this.setState({
                message: randomString
            });
        });
    }

    pollingStop() {
        this.polling.unsubscribe();
    }


    // Render
    render() {
        let { message } = this.state;

        return (
            <div>
                <h1>{ message && <span>{message}</span> }</h1>
                <div className="buttons">
                    <button onClick={this.pollingStart.bind(this)}>Start</button>
                    <button onClick={this.pollingStop.bind(this)}>Stop</button>
                </div>
                <p><small>new</small></p>
            </div>
        );
    }
}

export default Message;
