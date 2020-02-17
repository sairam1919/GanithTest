import { signInSuccess } from "../store/actions/SignInActions";
import { signUpSuccess } from "../store/actions/SignupAction";

export function signInUser(data) {
    return (dispatch) => {
            dispatch(signInSuccess({
                "isLogin": true,
                "statuscode":0,
                "description":"Successfully LoggedIn",
                "data":data
            }));
       
    };
}

export function signUpUser(data) {
    return (dispatch) => {
            dispatch(signUpSuccess({
                "isSignUp": true,
                "statuscode":0,
                "description":"Successfully Created User",
                "data":data
            }));
       
    };
}

