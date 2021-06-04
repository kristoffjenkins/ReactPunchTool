import React, {useEffect, useState} from 'react';
import moment from 'moment';
import * as mi from '@material-ui/core';
import * as api from '../api/api';

export default function MainTable(props){
    const {date} = props;
    
    const [employees, setEmployees] = useState([]);

    function handleDate(){
        console.log(date);
        let start = date.startDate;
        let end = date.endDate;
        if (start !==null && end !==null){
            console.log("hello"); 
        }
    }

    async function getEmployees(){
        let res = await api.getUsers();
        let data = res.data;
        let arr = [];

        data.forEach((item)=>{
            //console.log(item);
            arr.push(item);
        });
        setEmployees(arr);
        
    }
    async function MainData(){
        handleDate();
        let punches = [];
        let schedule = [];

        let punchRes = await api.getPunches();
        let punchData = punchRes.data;

        employees.forEach((emp)=>{
            let empId = emp._id;

            punchData.forEach((punch)=>{
                if (empId === punch.id_user){
                    let punchDate = punch.punch_date;
                    
                }
            })
        })
        
        


    }
    
    useEffect(()=>{
        getEmployees();
        MainData();
        // eslint-disable-next-line
    },[]);

    


    return(
        <>
            
        </>
    )
}