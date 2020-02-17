import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignIn.css';

export class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            userDetails: '',
            response: '',
            showError: false,
            showSuccess: false,
        }
    }
    onChangeInputBox(e, id) {
        if (id === 'userName') {
            this.setState({ userName: e.target.value });
        } else if (id === 'password') {
            this.setState({ password: e.target.value });
        }
    }
    goToSignUpPage() {
        this.props.goToSignUpPage();
    }
    signIn() {
        const {userList} = this.props;
        let data = userList && userList.userList ? userList.userList : [];
        if (this.props.goToDashBoard) {
            if (data.length) {
                data.forEach(element => {
                    if (element.UserName.trim() === this.state.userName && element.Password.trim() === this.state.password) {
                        this.props.goToDashBoard(element);
                    } else {
                        this.setState({response: "Invalid UserName (or) Password"});
                        this.setState({showError: true});
                    }
                })
            } else {
                this.setState({response: "There are no Users Available, Please go and Create one."});
                this.setState({showError: true});
            }
        }
    }
    render() {
        const {showError, response } = this.state;
        return (
            <div>
                <div className="signin-form-container">
                    <h1>Sign in</h1>
                    <input type="username" className="input-box" placeholder="User Name" value={this.state.userName} onChange={(e) => this.onChangeInputBox(e, 'userName')} />
                    <input type="password" className="input-box" placeholder="Password" value={this.state.password} onChange={(e) => this.onChangeInputBox(e, 'password')} />
                    <a className="signin-a-tag" href="#">Forgot your password?</a>
                    <button className="signin-btn form-btn" onClick={() => this.signIn()}>Sign In</button>
                    {showError ? <span className ="ErrorMessage">{response}</span> : ""}
                </div>
                <div className="overlay-form-container">
                    <div className="overlay-form">
                        <div className="overlay-form-panel">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="form-btn singup-right-btn" onClick={() => this.goToSignUpPage()}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(null, null)(SignIn);
