import React, {useEffect,useState} from 'react';
import * as mui from '@material-ui/core';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
//Api
import * as api from '../api/api';

export default function Dashboard(){
    const [date, setDate] =useState({startDate:null, endDate:null});
    const [state, setState] = useState({startDate:null, endDate:null})

    const [activeUser, setActiveUser] = useState({
        _id:'',
        first_name:'',
        last_name:'',
        email:'',
        _role:''
    });
    //const {_id,first_name,last_name,email,_role} = activeUser

    async function getCurrentUser(){
        try {
            let response = await api.activeUser();
            let data = response.data;
            setActiveUser(data);
            
            
        } catch (err) {
            console.error(err.message);
        }
    };

    async function getEmployees(){
        let res = await api.getUsers();
        let data = res.data;
        return data
    }

    async function getPunches(){
        let res = await api.getPunches();
        let data = res.data;
        return data;
    }
    async function getSchedules(){
        let res = await api.getSchedule();
        let data = res.data;
        return data;
    }

    function handleDate(){
        let start = date.startDate;
        let end = date.endDate;

        if ( start !==null && end !==null){
            start = moment(start._d).format("DD/MM/YYYY");
            end = moment(end._d).format("DD/MM/YYYY");
            let obj = {start: start, end: end};
            return obj;
        }else{
            let obj = {start:"", end:""};
            return obj;
        }
    }

    async function MainData(){
        const dateRange = handleDate();
        const punch = await getPunches();
        const emp = await getEmployees();
        const sched = await getSchedules();

        emp.forEach((user)=>{
            let emp_id = user._id;
            let date_arr = [];
            punch.forEach((p)=>{
                let id = p.id_user
                if(emp_id === id){
                    let date = p.punch_date;
                    date_arr.push(date);
                }
            })


                
            
            
        })
        
    }

    
    
    useEffect(()=>{
        getCurrentUser();
        // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        MainData();
    },[date]);



    return(
        <>
            <mui.CssBaseline/>
            <h1>Dashboard</h1>
            <mui.Container>
                <div>
                    <DateRangePicker
                        startDate={date.startDate} // momentPropTypes.momentObj or null,
                        endDateId={"end"}
                        startDateId={"start"}
                        endDate={date.endDate} // momentPropTypes.momentObj or null,
                        onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput =>setState({ focusedInput })} // PropTypes.func.isRequired
                    />
                </div>
                <div>
                </div>
            </mui.Container>
            
            
            

        </>
    )
} 