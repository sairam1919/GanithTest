import { HomeConstants } from "../../utils/Constants";

export function signUpSuccess(data){
    return{
        type:HomeConstants.SIGNUP_SUCCESS,
        data
    }
}
export function signUpFailed(error){
    return{
        type:HomeConstants.SIGNUP_FAILED,
        error
    }
}