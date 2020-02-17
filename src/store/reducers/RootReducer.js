import {
    combineReducers
} from 'redux';

import { signInReducer } from './SignInReducer';
import { signupReducer } from './SignupReducer';
import { eventReducer } from './EventReducer';


const rootReducer = combineReducers({
    signInData: signInReducer,
    userList: signupReducer,
    events: eventReducer
})

export default rootReducer;