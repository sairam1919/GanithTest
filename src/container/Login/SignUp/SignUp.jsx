import React , { Component } from "react";
import './SignUp.css';
import { alphaNumericValidation, emailValidation } from "../../../utils/InputValidation";
import axios from 'axios';

const roles = ['Admin','User'];

export class SingUp extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            userName:'',
            password:'',
            confirmPassword:'',
            mobileNum:'',
            userRole:'',
            isError:false,
            emailValidationError:false,
            response: "",
            showError: false,
            showSuccess: false,
        };
    }
    goToSignInPage(){
        this.props.goToSignInPage();
    }
    onChangeInputBox(e,id){
        if(id === 'email'){
            this.setState({email:e.target.value});
        }else if(id === 'userName'){
            this.setState({userName:e.target.value});
        }else if(id === 'password'){
            this.setState({password:e.target.value});
        }else if(id === 'confirmPassword'){
            this.setState({confirmPassword:e.target.value});
        }else if(id === 'mobileNum'){
            this.setState({mobileNum:e.target.value});
        }else if(id === 'userRole'){
            this.setState({userRole:e.target.value});
        }

    }

    signUp(){
        const { userName, email, password, mobileNum, userRole} = this.state;
        let body = { "UserName": userName, "Email": email, "Password": password, "MobileNumber": mobileNum, "Role": userRole};
        this.props.signUpUser(body);
        this.setState({showSuccess: true, response: "User Created Successfully. Please Try SignIn."});
    }

    render(){
        return(
            <div >
                <div className="overlay-signup-form-container">
                    <div className="overlay-signup-form">
                        <div className="overlay-signup-form-panel">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="form-btn signin-right-btn" onClick={()=>this.goToSignInPage()}>Sign In</button>
                        </div>
                    </div>
                </div> 
                <div className="signup-form-container">
                        {this.state.showError ? <span className = "responseMessage">{this.state.response}</span>: "" }
                        {this.state.showSuccess ? <span className = "responseMessage">{this.state.response}</span>: "" }
                        <h1>Create Account</h1>
                        <input type="email" className="input-box" placeholder="Email" value={this.state.email} onChange={(e)=>this.onChangeInputBox(e,'email')} />
                        {this.state.emailValidationError ? "Please enter valied email": "" }
                        <input type="username" className="input-box" placeholder="User Name" value={this.state.userName} onChange={(e)=>this.onChangeInputBox(e,'userName')} />
                        <input type="password" className="input-box" placeholder="Password" value={this.state.password} onChange={(e)=>this.onChangeInputBox(e,'password')}/>
                        <input type="password" className="input-box" placeholder="Re Enter Password" value={this.state.confirmPassword} onChange={(e)=>this.onChangeInputBox(e,'confirmPassword')} />
                        <input type="text" className="input-box" placeholder="Mobile Number" value={this.state.mobileNum} onChange={(e)=>this.onChangeInputBox(e,'mobileNum')} />
                        <select className="drop-dow">
                            <option value="">Select User Role</option>
                            {
                                roles.map(function(val,i){
                                    return <option key={i} value={val}>{val}</option>
                                })
                            }
                        </select>
                        <button className="signup-btn form-btn" onClick={()=>this.signUp()} >Sign Up</button>
                </div>
            </div>
        )
    }
}

export default SingUp;