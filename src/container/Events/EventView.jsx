import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';

// React Notification
import { NotificationManager } from 'react-notifications';

export default class EventView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            event_name: '',
            event_description: '',
            event_location: '',
            event_duration: '',
            event_fees: '',
            event_tags: '',
            max_participants: '',
            isEditModalOpen: false,
            showParticipentsList: false,
            canParticipate: true,
            isRegisterd: false,
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
        this.enableParticipateButton();
    }

    handleParticipate = () => {
        let obj = { "event_name": this.props.selectedEvent.event_name, 
        "user_name": this.props.signInData.userDetails.data.UserName};
        if (this.props.handleParticipentsList) {
            let content = this.props.selectedEvent + " " + "Has Been Nominated Successfully";
            // this.props.showNotification(content);
            this.props.handleParticipentsList(obj);
            NotificationManager.success(content, 'Successful!', 2000);
        }
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

    handleEdit = () => {
        const { event_name, event_description, event_duration, event_fees, event_location, event_tags, max_participants } = this.state;
        this.setState({ isEditModalOpen: false });
        const { eventsData, selectedEvent } = this.props;
        if (eventsData && eventsData.eventList && eventsData.eventList.length) {
            eventsData.eventList.forEach((element) => {
                if (element.event_name === selectedEvent.event_name) {
                    if (event_description) {
                        element.event_description = event_description;
                    }
                    if (event_duration) {
                        element.event_duration = event_duration;
                    }
                    if (event_fees) {
                        element.event_fees = event_fees;
                    }
                    if (event_location) {
                        element.event_location = event_location;
                    }
                    if (event_tags) {
                        element.event_tags = event_tags;
                    }
                    if (max_participants) {
                        element.max_participants = max_participants;
                    }
                }
            })
        }
        let content = this.props.selectedEvent + "Has Been Updated Successfully";
        this.props.showNotification(content);
    }

    handleDelete = () => {
        const { eventsData, selectedEvent } = this.props;
        if (eventsData && eventsData.eventList && eventsData.eventList.length) {
            eventsData.eventList.forEach((element, index) => {
                if (element.event_name === selectedEvent.event_name) {
                    eventsData.eventList.splice(index, 1);
                }
            })
        }
        let content = this.props.selectedEvent.event_name + " " + "Has Been Deleted Successfully";
        this.props.showNotification(content);
        this.props.handleButtonClick();
    }

    hideEventEditModal = () => {
        this.setState({ isEditModalOpen: false });
    }

    showEventEditModal = () => {
        this.setState({ isEditModalOpen: true });
    }

    handleParticipants = () => {
        
    }

    handleParticipentsList = () => {
        this.setState({ showParticipentsList: true });
    }

    enableParticipateButton = () => {
        const { participentsList, selectedEvent } = this.props;
        if (participentsList && participentsList.length) {
            participentsList.forEach(element => {
                if (element.event_name === selectedEvent.event_name) {
                    if (element.participents && element.participents.length) {
                        if (element.participents.length == selectedEvent.max_participants) {
                            this.setState({ canParticipate: false });
                        }
                        element.participents.forEach(elemnt => {
                            if(elemnt === this.props.signInData.userDetails.data.UserName) {
                                this.setState({isRegisterd: true})
                            }
                        });
                    }
                }
            })
        }
    }

    showUserListModal = () => {
        this.setState({ showParticipentsList: true });
    }
    hideUserListModal = () => {
        this.setState({ showParticipentsList: false })
    }

    render() {
        const {  selectedEvent, participentsList } = this.props;
        let renderUserList = [];
        if (participentsList && participentsList.length) {
            participentsList.forEach(element => {
                if (element.event_name === selectedEvent.event_name) {
                    if (element.participents && element.participents.length) {
                        element.participents.forEach(item => {
                            renderUserList.push(
                                <p className="userList">{item}</p>
                            )
                        });
                    }else {
                        renderUserList.push(
                            <p className="userList">No Users Available</p>
                        )
                    }
                }
            });
        }
        return (
            <div>
                <div className="row mainDiv">
                    <span className="eventName" onClick={this.props.handleButtonClick}>{selectedEvent.event_name.toUpperCase()}</span>
                </div>
                <div className="row" id="btnBlock">
                    <div className="buttonDiv"> <Button onClick={this.handleParticipate} 
                    className = {this.state.canParticipate && ! this.state.isRegisterd ? "buttonParticipate": "buttonParticipateDisabled"}>Participate</Button></div>
                    <div className="buttonDiv"> <Button onClick={this.showEventEditModal}>Edit</Button></div>
                    <div className="buttonDiv"> <Button onClick={this.handleDelete}>Delete</Button></div>
                    <div className="buttonDiv"> <Button onClick={this.showUserListModal}>View Registerd Participants</Button></div>
                </div>

                <Modal
                    isOpen={this.state.showParticipentsList}
                    style={this.state.modalCSS}
                    ariaHideApp={false}
                >
                    <div className="create-project-header">
                        <a className="project-cross-symbol" onClick={this.hideUserListModal}>X</a>
                        <h4>Participants List</h4>
                    </div>
                    <div className="create-project-body">
                        {renderUserList}
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.isEditModalOpen}
                    style={this.state.modalCSS}
                    ariaHideApp={false}
                >
                    <div className="create-project-header">
                        <a className="project-cross-symbol" onClick={this.hideEventEditModal}>X</a>
                        <h4>Edit Event</h4>
                    </div>
                    <div className="create-project-body">
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Event Name" defaultValue={selectedEvent.event_name} onChange={(e) => this.onChangeInputBox(e, 'event_name')} readOnly />
                        </div>
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Event Description" defaultValue={selectedEvent.event_description} onChange={(e) => this.onChangeInputBox(e, 'event_description')} />
                        </div>
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Event Duration" defaultValue={selectedEvent.event_duration} onChange={(e) => this.onChangeInputBox(e, 'event_duration')} />
                        </div>
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Event Location" defaultValue={selectedEvent.event_location} onChange={(e) => this.onChangeInputBox(e, 'event_location')} />
                        </div>
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Event Fees" defaultValue={selectedEvent.event_fees} onChange={(e) => this.onChangeInputBox(e, 'event_fees')} />
                        </div>
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Event Tags" defaultValue={selectedEvent.event_tags} onChange={(e) => this.onChangeInputBox(e, 'event_tags')} />
                        </div>
                        <div className="create-project-fields">
                            <input type="text" className="input-box" placeholder="Max no of Participants" defaultValue={selectedEvent.max_participants} onChange={(e) => this.onChangeInputBox(e, 'max_participants')} />
                        </div>
                    </div>
                    <div className="crate-project-footer">
                        <button className="c-btn c-btn-cancle" onClick={this.hideEventEditModal}>Cancle</button>
                        <button className="c-btn c-btn-save" onClick={this.handleEdit} >Save</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
