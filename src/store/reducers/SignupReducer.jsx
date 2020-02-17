import { HomeConstants } from "../../utils/Constants";

const userList = [{"UserName": "Sairam", "Password": "12345", "Email": "Sairam", "Role": "Admin"}];
export function signupReducer(state = {userList},action){
    const newState = {};
    switch(action.type){
        case HomeConstants.USER_LIST:
               return {
                    ...state
                };
        case HomeConstants.SIGNUP_SUCCESS:
                return {
                    ...state,
                    userList:[...state.userList, action.data.data]
                };
        case HomeConstants.SIGNUP_FAILED:
                return {
                    ...state
                };

        case HomeConstants.USER_DETAILS:
            return {
                ...state,
                userList: action.data
            }
        default:
                return {
                    ...state
                };
    }
}