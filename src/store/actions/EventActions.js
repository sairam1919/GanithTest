import { HomeConstants } from "../../utils/Constants";

export function saveEvent(events){
    console.log("events", events);
    return{
        type:HomeConstants.EVENT_SUCCESS,
        events
    }
}
export function fetchEvents(){
    return{
        type:HomeConstants.EVENT_LIST,
    }
}

export function deleteEvent(events){
    return{
        type:HomeConstants.EVENT_DELETE,
        events
    }
}

export function updateEventDetails(eventDetails) {
    return {
        type: HomeConstants.EVENT_DETAILS,
        eventDetails
    }
}