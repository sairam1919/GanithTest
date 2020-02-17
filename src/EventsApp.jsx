import React, { Component } from "react";
import { connect } from 'react-redux';
import { signInUser, signUpUser } from "./services/SignInService";
import SignIn from "./container/Login/SignIn/SignIn";
import SingUp from "./container/Login/SignUp/SignUp";
import { Redirect } from 'react-router-dom';
import { AlertProvider } from 'react-alerts-plus';


export class EventsApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignIn: true,
            isSignUp: false,
            userDetails: {}
        };
    }

    goToSignUpPage = () => {
        this.setState({ isSignIn: false, isSignUp: true });
    }
    goToSignInPage = ()  =>{
        this.setState({ isSignIn: true, isSignUp: false });
    }
    goToDashBoard = (data) => {
        this.props.signInUser(data);
    }

    signUpUser = (data) => {
        this.setState({userList: data});
        this.props.signUpUser(data);
    }

    render() {
        const loginForm = (
            <div className="home-page-container" >
                <h4 className={this.state.isSignIn ? "heading" : "heading float-right"}> Events App </h4>
                {this.state.isSignIn ?
                    <SignIn goToSignUpPage={this.goToSignUpPage}
                        goToDashBoard={this.goToDashBoard}
                        userList = {this.props.userList}></SignIn>
                    : ""
                }
                {this.state.isSignUp ?
                    <SingUp goToSignInPage={this.goToSignInPage}
                    signUpUser = {this.signUpUser}
                    ></SingUp>
                    : ""
                }
            </div>
        );
        return (
            <AlertProvider>
            <div>
                {this.props.signInData.isLogin
                    ? 
                    <Redirect to='/homePage' 
                    />
                    : loginForm
                }
            </div>
            </AlertProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signInData: state.signInData,
        userList: state.userList,
        events: state.events
    };
};

/**
 * mapDispatchToProps - receives the dispatch() method and returns callback back props to use in component
 */
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (data) => dispatch(signInUser(data)),
        signUpUser: (data) => dispatch(signUpUser(data))
    };
};

/**
* connect() method connects component to redux store
*/
export default connect(mapStateToProps, mapDispatchToProps)(EventsApp);