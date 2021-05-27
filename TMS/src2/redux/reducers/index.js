import {combineReducers} from 'redux';

import activeUser from './activeUser';
import punches from './punches';
import allusers from './users';

export default combineReducers({
    User: activeUser,
    Punches: punches,
    AllUsers: allusers,
});