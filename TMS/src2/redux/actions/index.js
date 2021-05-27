import * as api from '../../api/index';
import * as constant from '../constants/index'


/* Get User Details
Pages -> dashboard */
export const getUser = () => async (dispatch) => {
    try {
        const response = await api.getUserInfo();
        const data = response.data;

        dispatch({type: constant.GET_USER, payload: data})

    } catch (err) {
        console.error(err.message);
    }
};


/*Get All Punches
Pages -> dashboard*/
export const getAllPunches = () => async (dispatch) => {
    try {
        const response = await api.getAllPunches();
        const data = response.data;
        console.log(data);
        dispatch({type: constant.GET_ALL_PUNCHES, payload: data});
    } catch(err){
        console.error(err.message);
    }
};

/*Get All Users
Pages -> Timesheet*/
export const getAllUsers = () => async (dispatch) => {
    try {
        const res = await api.getAllUsers();
        const data = res.data;
        //console.log(data);
        dispatch({type: constant.GET_ALL_USERS, payload: data});
    } catch (err) {
        console.error(err.message);
    }
};

