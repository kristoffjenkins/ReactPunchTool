import React, {useState} from 'react';
import * as mi from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import * as icons from 'react-icons/ai';
import moment from 'moment';
import * as api from '../api/api';


export default function ActivityTime({list,date}) {

    const [sched, setSched] = useState([{action:"", time:""}]);

    const handleInput = (e, index) => {
        const vals = [...sched];
        vals[index][e.target.name] = e.target.value;
        setSched(vals);
        console.log(sched);
    };

    const addFields = () => {
        setSched([...sched, {action:"" , time:""}]);
    }

    const removeFields = (index) =>{
        if (index > 0){
            const vals = [...sched];
            vals.splice(index,1);
            setSched(vals);
        }
    }

    const activityList = [
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
    ]

    //Date
    function getDays (start, end){
        const from = new Date(moment(start));
        const to = new Date (moment(end));

        const mill_From = from.getTime();
        const mill_To = to.getTime();
        const arr = [];
        if (mill_From <= mill_To){
            for(let i = mill_From; i <=mill_To; i = i + 86400000){
                const dates = moment(new Date(i)).format("DD/MM/YYYY");
                arr.push(dates);
            }
            return arr;
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let from = date[0].from;
        let to = date[0].to;
        let daysList = getDays(from, to);
        
        
        list.forEach((item)=>{
            let emp = item.user.split(",");
            let id = emp[0];
            let first_name = emp[1];
            let last_name = emp[2];

            daysList.forEach((item)=>{

                sched.forEach(async (element) =>{
                    //console.log(element);
                    //check schedule
                    /* let data = await api.getSchedule();
                    console.log(data.data); */
                     let obj = {id_creator:"50073", id_user: id, first_name: first_name, last_name: last_name, punch_date:item, punch_time:element.time, activity:element.action};
                    let res = await api.AddSchedule(obj);
                    console.log(res.data);
                    
                })
                  
                
            })
        })
    }


    return(
        <>
            
            {sched.map((item, index) =>(
                <mi.Grid container key ={index} >
                <mi.Grid item xs={4} style={{padding:"3px"}}>
                    <mi.TextField fullWidth select variant="outlined" name="action" label="Activity" InputLabelProps={{shrink: true}} value={item.action} onChange={e => handleInput(e,index)} >
                        {activityList.map((option)=>(
                            <mi.MenuItem key ={option.value} value ={option.value}>
                                {option.lable}
                            </mi.MenuItem>
                        ))}
                    </mi.TextField>
                </mi.Grid>

                <mi.Grid item xs={4} style={{padding:"4px"}}> 
                    <mi.TextField fullWidth variant="outlined" type="time" label="Time" name="time" InputLabelProps={{shrink: true}} value={item.time} onChange={e => handleInput(e,index)} />
                </mi.Grid>

                <mi.Grid item xs={4}> 
                    <mi.IconButton onClick={() => removeFields(index)}>
                        <icons.AiOutlineMinusCircle/>
                    </mi.IconButton>

                    <mi.IconButton onClick={() => addFields()}>
                        <icons.AiOutlinePlusCircle/>
                    </mi.IconButton>
                </mi.Grid>
                </mi.Grid>
                ))} 
            <mi.Button  variant="contained"  color="primary" type="submit" endIcon={<Icon>send</Icon>} onClick={handleSubmit}>Submit</mi.Button> 
        </>
    )


}