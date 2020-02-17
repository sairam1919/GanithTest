
import { saveEvent } from '../store/actions/EventActions';

export function saveEvent(data) {
    return (dispatch) => {
            dispatch(saveEvent({
                "statuscode":0,
                "description":"Event Created Successfully",
                "data":data
            }));
    };
}