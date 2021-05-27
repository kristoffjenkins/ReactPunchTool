import axios from 'axios'

// Authenticated Request
//@Authorization
export const getAuth = () => axios({
    method: 'GET',
    url: 'http://localhost:5000/auth/is-verify',
    headers: {token: localStorage.token},
});

//Get Log in Attempted Details
//Pages - login.js
export const getLoginCreds = (body) => axios({
    method: 'POST',
    url: 'http://localhost:5000/auth/login',
    headers: {'Content-Type': 'application/json'},
    data:body

});
 

// Get User Details
// Pages - dashboard.js
export const getUserInfo = () => axios({
    method: 'GET',
    url: 'http://localhost:5000/dashboard',
    headers: {token: localStorage.token},
});

//Get All Punches
//Pages - dasboard.js
export const getAllPunches =() => axios({
    method: 'GET',
    url: 'http://localhost:5000/timesheets/punches',
    headers: {token: localStorage.token},
});

/* Submit Punch
Pages - dasboard
component- app bar */
export const postPunch = (body) => axios({
    method: 'POST',
    url: 'http://localhost:5000/timesheets/punches',
    headers: {'Content-Type': 'application/json'},
    data:body
});

/*Get All Users
Pages -> Timesheet*/
export const getAllUsers = () => axios({
    method:'GET',
    url:'http://localhost:5000/dashboard/all',
    headers: {token: localStorage.token},
});

/*Delte Punch
Pages => Timesheet*/
export const deletePunch = (id) =>axios({
    method:'POST',
    url:'http://localhost:5000/timesheets/punches/delete',
    headers: {'Content-Type': 'application/json'},
    data:id
})