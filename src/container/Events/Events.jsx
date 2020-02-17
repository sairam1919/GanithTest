import React, { Component } from 'react';
import Modal from 'react-modal';
import EventView from './EventView';
import Notificationbar from '../NotificationBarContainer/NotificationBarContainer';




export default class Events extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventSelected: false,
            isEventCreationDropdownOpen: false,
            selectedEvent: {},
            event_name: '',
            event_description: '',
            event_location: '',
            event_duration: '',
            event_fees: '',
            event_tags: '',
            max_participants: '',
            notificationContnet: '',
            showNotification: false,
            modalCSS: {
                overlay: {
                    position: 'fixed',
                    top: 268,
                    left: 0,
                    right: 0,
                    bottom: 315,
                    backgroundColor: '#dfdfec'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    height: '434px',
                    width: '550px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.05), 0 30px 40px 0 rgba(0,0,0,0.2)'
                },
            }
        }
    }

    showEventCreationDropdown = () => {
        this.setState({ isEventCreationDropdownOpen: true });
    }
    hideEventCreationDropdown = () => {
        this.setState({ isEventCreationDropdownOpen: false });
    }

    showEventDetails = (e, element) => {
        this.setState({ isEventSelected: true, selectedEvent: element });
    }

    onChangeInputBox = (e, id) => {
        if (id === 'event_name') {
            this.setState({ event_name: e.target.value });
        } else if (id === 'event_description') {
            this.setState({ event_description: e.target.value });
        } else if (id === 'event_duration') {
            this.setState({ event_duration: e.target.value });
        } else if (id === 'event_location') {
            this.setState({ event_location: e.target.value });
        } else if (id === 'event_fees') {
            this.setState({ event_fees: e.target.value });
        } else if (id === 'event_tags') {
            this.setState({ event_tags: e.target.value });
        } else if (id === 'max_participants') {
            this.setState({ max_participants: e.target.value });
        }
    }

    createEvent = () => {
        const { event_name, event_description, event_duration, event_fees, event_location, event_tags, max_participants } = this.state;
        let obj = {
            "event_name": event_name, "event_description": event_description, "event_duration": event_duration,
            "event_fees": event_fees, "event_location": event_location, "event_tags": event_tags, "max_participants": max_participants
        };
        this.setState({ isEventCreationDropdownOpen: false });
        if (this.props.createEvent) {
            this.props.createEvent(obj)
        }
        this.showNotification(event_name + " " + "Has been Created Successfully");
    }

    handleButtonClick = () => {
        this.setState({ isEventSelected: false });
    }

    showNotification = (content) => {
        this.setState({ showNotification: true, notificationContnet: content })
    }

    hideNotification = () => {
        this.setState({ showNotification: false })
    }

    handleParticipentsList = (obj) => {
        if (this.props.handleParticipentsList) {
            this.props.handleParticipentsList(obj);
        }
    }

    render() {
        const { eventsData, participentsList, signInData } = this.props;
        const { isEventSelected, selectedEvent, showNotification, notificationContnet, event_description } = this.state;
        let renderEvents = [];

        if (eventsData && eventsData.eventList && eventsData.eventList.length) {
            eventsData.eventList.forEach(element => {
                renderEvents.push(
                    <div className="col-sm-3 eventDiv">
                        <div>
                            <span className="eventSpan" onClick={(e) => this.showEventDetails(e, element)}>{"Name: "}{element.event_name}</span>
                            <br></br>
                            <span className="eventSpan" onClick={(e) => this.showEventDetails(e, element)}>{"Description: "}{element.event_description}</span>
                            <br></br>
                            <span className="eventSpan" onClick={(e) => this.showEventDetails(e, element)}>{"Fees: "}{element.event_fees}</span>
                            <br></br>
                            <span className="eventSpan" onClick={(e) => this.showEventDetails(e, element)}>{"Location: "}{element.event_location}</span>
                            <br></br>
                            <span className="eventSpan" onClick={(e) => this.showEventDetails(e, element)}>{"Duration: "}{element.event_duration}</span>
                        </div>
                    </div>
                );
            });
        }

        renderEvents.push(
            <div className="col-sm-3 eventDiv newDiv">
                <span className="newEvent" onClick={this.showEventCreationDropdown}>Create New Event ...</span>
            </div>
        );

        return (
            <div>
                <h5 className="title">Events</h5>
                <div className="container">
                    {!isEventSelected ?
                        <div className="row">{renderEvents}</div> :
                        <EventView
                            eventsData={eventsData}
                            selectedEvent={selectedEvent}
                            handleButtonClick={this.handleButtonClick}
                            showNotification={this.showNotification}
                            handleParticipentsList={this.handleParticipentsList}
                            participentsList={participentsList}
                            signInData={signInData}
                        />}
                </div>
                {showNotification ? 
                    <Notificationbar
                    notificationContnet = {notificationContnet}
                    hideNotification = {this.hideNotification}
                     /> : ''
                }
                
                <Modal
                        isOpen={this.state.isEventCreationDropdownOpen}
                        style={this.state.modalCSS}
                        ariaHideApp={false}
                    >
                        <div className="create-project-header">
                            <a className="project-cross-symbol" onClick={this.hideEventCreationDropdown}>X</a>
                            <h4>Create New Event</h4>
                        </div>
                        <div className="create-project-body">
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Event Name" onChange={(e) => this.onChangeInputBox(e, 'event_name')} required />
                            </div>
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Event Description" onChange={(e) => this.onChangeInputBox(e, 'event_description')} />
                            </div>
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Event Duration" onChange={(e) => this.onChangeInputBox(e, 'event_duration')} required />
                            </div>
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Event Location" onChange={(e) => this.onChangeInputBox(e, 'event_location')} required />
                            </div>
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Event Fees" onChange={(e) => this.onChangeInputBox(e, 'event_fees')} required />
                            </div>
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Event Tags" onChange={(e) => this.onChangeInputBox(e, 'event_tags')} />
                            </div>
                            <div className="create-project-fields">
                                <input type="text" className="input-box" placeholder="Max no of Participants" onChange={(e) => this.onChangeInputBox(e, 'max_participants')} required />
                            </div>
                        </div>
                        <div className="crate-project-footer">
                            <button className="c-btn c-btn-cancle" onClick={this.hideEventCreationDropdown}>Cancle</button>
                            <button className="c-btn c-btn-save" onClick={this.createEvent} >Save</button>
                        </div>
                    </Modal>
                </div>
        )
            }
        }
