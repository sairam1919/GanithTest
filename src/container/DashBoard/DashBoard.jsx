import React, { Component } from "react";
import { Navbar } from 'reactstrap';
import './DashBoard.css';
import Events from "../Events/Events";

export class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEventCreationDropdownOpen: false,
            isEventParticipationDropdownOpen:false,
            participentsList: []
        }
    }

    createEvent = (obj) => {
        this.state.participentsList.push(
            {"event_name": obj.event_name, "participents": []}
        )
        this.props.saveEvent(obj);
    }

    handleParticipentsList = (obj) => {
        let temp = this.state.participentsList;
        temp.forEach(element => {
            if(element.event_name === obj.event_name) {
                element.participents.push(obj.user_name);
            }
        })
        this.setState({participentsList: temp});
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar expand="sm" className="navabar-main" >
                        <div className="dashboard">
                            Dashboard
    					</div>
                    </Navbar>
                    <div className="dashboard-divider" />
                </div>

                <div className = "Events">
                    <Events
                    eventsData = {this.props.eventsData}
                    createEvent =  {this.createEvent}
                    participentsList = {this.state.participentsList}
                    handleParticipentsList = {this.handleParticipentsList}
                    signInData={this.props.signInData}
                     />
                </div>
            </div>
        );
    }

}
export default DashBoard;