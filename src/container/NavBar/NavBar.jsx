import React, { Component } from "react";
import { connect } from 'react-redux';
import './NavBar.css';
import ReactTooltip from 'react-tooltip';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import 'react-dropdown/style.css'

export class NavBar extends Component{
    constructor(props){
        super(props);
        this. state = {
            dropdownOpen: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
    	this.setState({
    		dropdownOpen: !this.state.dropdownOpen
    	});
    }
    logOut(){
        this.props.logOut(this.state);
    }

    render(){
        const {signInData} = this.props;
        const UserName = signInData && signInData.userDetails && signInData.userDetails.data 
        ? signInData.userDetails.data.UserName: "";
        const Role = signInData && signInData.userDetails && signInData.userDetails.data 
        ? signInData.userDetails.data.Role: "";
        let items = [];
        return(
            <div className="app-wrapper">
                <div className="nav-wrapper">
                    <div className="top-nav-container">
                        <div className="navbar-brand-left">
                            <ul className="icon-compname">
                                <li className="comp-name">Events App </li>
                            </ul>
                        </div>
                        <div className="navbar-middle">
                        </div>
                        <div className="navbar-right">
                            <ul className="user-operations">
                                <div className="devider"></div>
                                <li className="nav-notify-icon" data-tip="Notifications"></li>
                                <div className="devider"></div>
                                <li className="user-iocn-li">
                               
                               <Dropdown drop='right' isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
    								<DropdownToggle
    									tag="span"
    									data-toggle="dropdown"
    									aria-expanded={ this.state.dropdownOpen }
    								>
    									<div className="nav-user-icon"></div>
    								</DropdownToggle>
    								<div className="menuarea">
                                    { this.state.dropdownOpen ? <div className="carddrop-withoutborder"></div> : ''}
    									<DropdownMenu className="user-preferences">
                                        <DropdownItem onClick={()=>this.logOut()} >Logout</DropdownItem>
    									</DropdownMenu>
    								</div>
    							</Dropdown>
                                
                                </li>
                                    <ReactTooltip type='dark' place="bottom" effect="float"/>
                                <li className="user-name-role" data-tip={"Logged in as "+ UserName + "("+Role +")"}>
                                    <p className="user-profile-user-name">{UserName}</p>
                                    <p>{Role}</p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        signInData: state.signInData,
    }
}

export default connect(mapStateToProps, null)(NavBar);