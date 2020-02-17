import React, { Component } from "react";
import './notificationBarContainer.css';
import Modal from 'react-modal';

/**
 * Container for Notification Bar
 * Handles the Rendering logic and timeout for notifications.
 */
export default class Notificationbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showNotification: true,
        }
    }

    hideNotification = () => {
        this.props.hideNotification();
    }

    render() {
        const  {showNotification, notificationCSS} = this.state;
    return (
        <div id = "notification-main">
            <div className="create-project-header">
                <a className="project-cross-symbol" onClick={this.hideNotification}>X</a>
                 <h6>{this.props.notificationContnet}</h6>
             </div>
        </div>
    )
    }
}
    