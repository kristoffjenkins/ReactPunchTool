import React, {useEffect, useState} from 'react';
import * as mui from '@material-ui/core';
import * as api from '../api/api';
import Icon from '@material-ui/core/Icon';
import * as icons from 'react-icons/ai'
import moment from 'moment';
import activity from '../components/ActivityTime';


export default function AddSchedule() {
    const schedule= [];

    //GET Users to Dispaly
    const userData =[];
    const [users, setUsers] = useState([]);

    async function getUsers () {
        let response = await api.getUsers();
        let userList = response.data;
        let userArray = [];
        userList.forEach(user =>{
            userArray.push({id: user._id, firstName: user.first_name, lastName: user.last_name})
        });
        setUsers(userArray);
    }

    useEffect(() => {
        getUsers();
    },[]);

    const handleClick =(e, i) => {
        e.preventDefault();

        if (e.target.checked === true){
            let object = {user:e.target.value}
            userData.push(object);
           
        }else{
            userData.splice(i, 1); 
        }
    };

    //DATE
    const date = [];
    
    /* const dateCheck = () =>{
        if(to !== "" && to < from){
            console.error("Invalid Date Range");
        }
    } */

    const handleDate = (e) => {
        e.preventDefault();
        console.log();
    
        let startDate;
        let endDate;
        if (e.target.name === "from"){
            startDate = e.target.value;
            date.push({startDate});
        }else {
            endDate = e.target.value;
            date.push({endDate});
        }
    }

    
    //add Actvities
    const newSched = [{action:"", time:""},];
    const handleInput = (e, i) =>{
        const vals = [...newSched];
        vals[i][e.target.name] = e.target.value;
        newSched.push(vals);

        console.log(newSched);
        
    };
    

    const addFields =() =>{
        //setNewSched([...newSched,{action:"", time:""}]);
        newSched.push({action:"yo", time:"yo"});
        
    }
    
    const removeFields = (i) =>{
        if(i > 0){
            const vals = [...newSched];
            vals.splice(i,1);
            newSched.push(vals);
        }
    }
    const activities =[
        {
            value: "Start",
            lable: "Start of Shift",
        },
        {
            value: "Break-out",
            lable: "Out to Break",
        },
        {
            value: "Break-in",
            lable: "In from Break",
        },
        {
            value: "Lunch-out",
            lable: "Out To Lunch",
        },
        {
            value: "Lunch-in",
            lable: "In From Lunch",
        },
        {
            value: "End",
            lable: "End of Shift",
        },
        
        
    ];
    //Add Schedule
    

    function  getDays (start, end){
        const from = new Date(moment(start));
        const to = new Date (moment(end));
        
         const mill_from = from.getTime();
        const mill_to = to.getTime();
        const arr = [];
        if (mill_from <= mill_to){

            for (let i = mill_from; i <= mill_to; i = i + 86400000){

                const dates = moment(new Date(i)).format("DD/MM/YYYY");
                arr.push(dates);
                
            }
            return arr;

        } 
        
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let from = date[0].startDate;
        let to = date[1].endDate;
        console.log(newSched);
        
        let dayslist = getDays(from, to);
        console.log(dayslist); 

        userData.forEach((item)=>{
            let user = item.user.split(",");
            let id = user[0];
            let firstName = user[1];
            let lastName = user[2];

            dayslist.forEach((item)=>{
                let obj = {id_user: id, firstName: firstName, lastName: lastName}
            })
            

        })
        
        
        
        
    }

    return (
        <mui.Grid container spacing={2}>
            <mui.Grid container item xs={6} >
                <mui.FormControl component="fieldset">
                    <mui.FormLabel component="legend">Employees</mui.FormLabel>
                    {users.map((employees,index) =>{
                        const{id, firstName, lastName} = employees;
                        return(
                            <mui.FormControlLabel key={index} control={
                                <mui.Checkbox 
                                    key={index} 
                                    value={[id, firstName, lastName]}
                                    onChange={event => handleClick(event, index)}
                                />
                            } 
                            label={[id," - ", firstName," ", lastName]}
                            />
                        )
                    })}
                </mui.FormControl>
            </mui.Grid>

            <mui.Grid container  item xs={6} >
                    <form style={{width:"100%"}} onSubmit={handleSubmit}>
                        <mui.Grid container>
                            <mui.Grid item xs={4} style={{padding:"5px"}}>
                                <mui.TextField fullWidth variant="outlined" name="from" label="from" InputLabelProps={{shrink: true}} type="date" value={date[0]} onChange={e => handleDate(e)} />
                            </mui.Grid>
                            <mui.Grid item xs={4} style={{padding:"5px"}}>
                                <mui.TextField  fullWidth variant="outlined" name="to" label="to" InputLabelProps={{shrink: true}} type="date" value={date[1]} onChange={e => handleDate(e)} />
                            </mui.Grid>
                        </mui.Grid>
                        <div style={{padding:"7px"}}>
                            {activity.map((shed,index)=>(
                                <mui.Grid container key={index}>
                                    <mui.Grid item xs ={4} style={{padding:"5px"}}>
                                        <mui.TextField fullWidth select variant="outlined" name="action" label="Activity" InputLabelProps={{shrink: true}} value={shed[index]} onChange={e => handleInput(e, index)}>
                                            {activities.map((option) =>(
                                                <mui.MenuItem key ={option.value} value={option.value} >
                                                    {option.lable}
                                                </mui.MenuItem>
                                            ))}
                                        </mui.TextField>
                                    </mui.Grid>
                                    <mui.Grid item xs={4} style={{padding:"5px"}}>
                                        <mui.TextField fullWidth variant="outlined" type="time" label="Time" name="time" InputLabelProps={{shrink: true}} value={shed[index]} onChange={e => handleInput(e, index)}/>
                                    </mui.Grid>
                                    <mui.Grid item xs={4} style={{padding:"5px"}}>
                                    <mui.IconButton onClick={() => removeFields(index)}>
                                        <icons.AiOutlineMinusCircle/> 
                                    </mui.IconButton>
                                    <mui.IconButton onClick={() => addFields()}>
                                        <icons.AiOutlinePlusCircle/>
                                    </mui.IconButton>
                                    </mui.Grid>
                                </mui.Grid>
                            ))}
                        </div>
                        <mui.Button  variant="contained"  color="primary" type="submit" endIcon={<Icon>send</Icon>} onClick={handleSubmit}>Submit</mui.Button>
                    </form>
            </mui.Grid>
        </mui.Grid>
    )
}