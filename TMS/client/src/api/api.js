import axios from 'axios'

/*Authenticated Request*/
export const getAuth = () => axios({
    method:'GET',
    url: 'http://localhost:5000/auth/is-verify',
    headers: {token: localStorage.token}
});

/*Get Login Details*/
export const loginDetails = (body) => axios({
    method: 'POST',
    url: 'http://localhost:5000/auth/login',
    headers: {'Content-Type': 'application/json'},
    data:body
});

/*Get Active User */
export const activeUser = () => axios({
    method: 'GET',
    url: 'http://localhost:5000/dashboard',
    headers: {token: localStorage.token},
});

/*Get All Users*/
export const getUsers = () => axios({
    method:'GET',
    url:'http://localhost:5000/dashboard/all',
    headers: {token: localStorage.token},
});
/*Get user by id*/
export const getUserById = (body) =>axios({
    method:'POST',
    url:'http://localhost:5000/dashboard/userID',
    headers: {'Content-Type': 'application/json'},
    data:body
});

/*Get Punches*/
export const getPunches = () => axios({
    method: 'GET',
    url: 'http://localhost:5000/timesheets/punches',
    headers: {token: localStorage.token},
});

/*Submit Punch */
export const postPunch = (body) => axios({
    method: 'POST',
    url: 'http://localhost:5000/timesheets/punches',
    headers: {'Content-Type': 'application/json'},
    data:body
});

/*Delete Punch */
export const deletePunch = (id) =>axios({
    method:'POST',
    url:'http://localhost:5000/timesheets/punches/delete',
    headers: {'Content-Type': 'application/json'},
    data:id
});

/*Update Punch*/
export const updatePunch = (body) => axios({
    method:'PUT',
    url: 'http://localhost:5000/timesheets/punches/update',
    headers: {'Content-Type': 'application/json'},
    data:body
});

/*Get schedule*/
export const getSchedule = () => axios({
    method: 'GET',
    url:'http://localhost:5000/timesheets/schedule',
    headers: {token: localStorage.token}
});

/*Add schedule*/
export const AddSchedule = (body) => axios({
    method: 'POST',
    url:'http://localhost:5000/timesheets/schedule',
    headers:{token: localStorage.token},
    data: body
});

/*Delete schedule*/
export const deleteSchedule = (body) => axios({
    method: 'POST',
    url:'http://localhost:5000/timesheets/schedule/delete',
    headers: {'Content-Type': 'application/json'},
    data: body

});

/*Update Sechedule*/
export const updateSchedule =(body) =>axios({
    method:'PUT',
    url:'http://localhost:5000/timesheets/schedule/update',
    headers:{'Content-Type': 'application/json'},
    data: body

});

/*Add New Users*/
export const addUsers = (body) =>axios({
    method:'POST',
    url:'http://localhost:5000/auth/register',
    //headers:{'Content-Type': 'application/json'},
    data: body
});
