
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';
import { NavBar } from './NavBar/NavBar';
import { DashBoard } from './DashBoard/DashBoard';
import { userLogOut } from '../store/actions/SignInActions';
import { saveEvent, fetchEvents, updateEventDetails, deleteEvent } from '../store/actions/EventActions';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSignIn: true,
            currentPage: 'dashboard',
            showModal: false,
        };
        this.logOut = this.logOut.bind(this);
    }

    logOut(user) {
        this.props.userLogOut(user);
    }
    saveEvent = (event) => {
        console.log("event", event)
        if(this.props.saveEvent) {
            this.props.saveEvent(event);
        }
    }

    fetchEvents = () => {
        if(this.props.fetchEvents) {
            this.props.fetchEvents();
        }
    }

    updateEventDetails = (eventDetails) => {
        if(this.props.updateEventDetails) {
                this.props.updateEventDetails(eventDetails);
        }
    }

    deleteEvent = (event) => {
        if(this.props.deleteEvent) {
            this.props.deleteEvent(event);
        }
    }

    render() {
        const { signInData, events } = this.props;
        return (
            <div>
                    <div>
                        <NavBar 
                            signInData={signInData}
                            logOut={this.logOut}
                            userDetails = {this.props.userDetails}
                            />
                    </div>
                    <div>
                        <DashBoard
                        userDetails = {this.props.userList}
                        eventsData = {events}
                        saveEvent = {this.saveEvent}
                        fetchEvents = {this.fetchEvents}
                        deleteEvent = {this.deleteEvent}
                        updateEventDetails = {this.updateEventDetails}
                        signInData={signInData}
                        />
                    </div>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        signInData: state.signInData,
        events:state.events
    };
};

/**
 * mapDispatchToProps - receives the dispatch() method and returns callback back props to use in component
 */
const mapDispatchToProps = dispatch => {
    return {
        userLogOut: (user) => dispatch(userLogOut(user)),
        saveEvent:(event) => dispatch(saveEvent(event)),
        fetchEvents:()=> dispatch(fetchEvents()),
        updateEventDetails:(eventDetails) => dispatch(updateEventDetails(eventDetails)),
        deleteEvent: (event) => dispatch(deleteEvent(event))
    };
};

/**
* connect() method connects component to redux store
*/
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(HomePage);
