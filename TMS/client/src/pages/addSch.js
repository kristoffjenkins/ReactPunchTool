import React ,{useEffect, useState}from 'react';
import moment from 'moment';
import * as mui from '@material-ui/core';
import * as icons from 'react-icons/ai';
import * as api from '../api/api';

import Icon from '@material-ui/core/Icon'

export default function AddSchedule() {

    const [schedules, setSchedule] = useState([
        {id_creator:'',id_user:'',firstName:'',lastName:'',activity:'',punchDate:'',punchTime:''},
    ]);

    const [date, setDate] = useState({
        from:"", to:""
    });

    const handleDate = (e) =>{
        let startdate;
        let enddate;
        if (e.target.name === "from" ){
            startdate = e.target.value;
            setDate({...date, from: startdate});
        }else{
            enddate = e.target.value;
            setDate({...date, to: enddate});
        }
         
    }
    const {from, to} = date;
    const dateCheck = () =>{
        if (to !== "" && to < from ){
            console.error("invalid date");
            setDate({from:from, to:""});
        }
    }
    dateCheck();
    console.log(date);

    const data = [];

    const [users, setUsers] = useState([]);

    const handleClick = (event,index) =>{
        if (event.target.checked === true){
            //console.log(event.target.value);
            const obj = {user:event.target.value}
            data.push(obj); 
            //console.log(data);   
        }else {
            data.splice(index, 1);
            
        }
    }


     async function getUsers () {
        let res = await api.getUsers();
        let resdata = res.data;
        let obj =[];
         resdata.forEach(element => {
            obj.push({id: element._id, firstName: element.first_name, lastName: element.last_name})
           
        });
        setUsers(obj);

        
    } 
    useEffect(()=>{
        getUsers();
        
    },[]);

    //dropdown
    const activities = [
        {
            value :"Start of Shift",
            label :"Start of Shift"
        }
    ];
    const [action, setAction] = useState();

    const handleActivity = (e) =>{
        setAction(e.target.value);
    };

    return(
        <>
            <mui.Grid container spacing={1}>
               
                <mui.Grid container item xs={6}  >
                    <mui.FormControl component="fieldset">
                        <mui.FormLabel component="legend">Employees</mui.FormLabel>
                        {users.map((item,index)=>{
                            const {id, firstName,lastName} = item;
                            return(
                                    <mui.FormControlLabel key={index} control={<mui.Checkbox key={index} value={[id, firstName,lastName]}  onChange={event => handleClick(event,index)} />} label={[id," - ", firstName," ",lastName]} />
                                )
                        })}
                    </mui.FormControl>
                        
                </mui.Grid>
               
                <mui.Grid item xs={6}   >
                    <mui.Typography>Shift</mui.Typography>
                        
                    <mui.TextField   variant="outlined" name="from" label="from" InputLabelProps={{shrink: true}} type="date" value={from} onChange={e => handleDate(e)} />
                    <mui.TextField   variant="outlined" name="to" label="to" InputLabelProps={{shrink: true}} type="date" value={to} onChange={e => handleDate(e)} />
                    
                        
                        
                    <mui.Grid item xs={4}>
                        <mui.TextField select  fullWidth variant="outlined" name="startTime" value={action} onChange={e => handleActivity(e)} >
                            {activities.map((option) => (
                                console.log(option),
                                <mui.MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </mui.MenuItem>
                            ))}
                        </mui.TextField>
                       
                    </mui.Grid>

                    <mui.Grid item xs={5}>
                        <mui.TextField   variant="outlined" name="startTime"  type="time" />
                    </mui.Grid>

                    <mui.Grid item xs={12}>
                        <mui.TextField   variant="outlined" name="startTime" value="Activity"  />
                        <mui.TextField   variant="outlined" name="startTime"  type="time" />
                    </mui.Grid>

                    <mui.Grid item xs={12}>
                        <mui.TextField   variant="outlined" name="startTime" value="Activity"  />
                        <mui.TextField   variant="outlined" name="startTime"  type="time" />
                    </mui.Grid>

                    <mui.Grid item xs={12}>
                        <mui.TextField   variant="outlined" name="startTime" value="Activity"  />
                        <mui.TextField   variant="outlined" name="startTime"  type="time" />
                    </mui.Grid>
                </mui.Grid>
             
            </mui.Grid> 
        </>
    )
}
