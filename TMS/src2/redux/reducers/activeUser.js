import {GET_USER} from '../constants/index';

const reducers = (state = [], action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_USER:
            return payload;
    
        default:
            return state;
    }
};

export default reducers;