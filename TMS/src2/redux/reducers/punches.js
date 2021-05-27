import {GET_ALL_PUNCHES} from '../constants/index'


const reducers = (state={}, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_ALL_PUNCHES:
           return payload;
    
        default:
            return state;
    }

};

export default reducers