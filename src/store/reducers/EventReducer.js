import { HomeConstants } from "../../utils/Constants";
const eventList = [];
export function eventReducer(state = { eventList }, action) {
    const newState = {};
    console.log("Action: ", action);
    switch (action.type) {
        case HomeConstants.EVENT_LIST:
            return {
                ...state
            };
        case HomeConstants.EVENT_SUCCESS:
            return {
                ...state,
                eventList: [...state.eventList, action.events]
            };
        case HomeConstants.EVENT_FAILED:
            return {
                ...state
            };

        case HomeConstants.EVENT_DETAILS:
            return {
                ...state,
                eventList: action.eventDetails
            }
        case HomeConstants.EVENT_DELETE:
            return {
                ...state,
                eventList: [...state.eventList, action.events]
            }
        default:
            return {
                ...state
            };
    }
}