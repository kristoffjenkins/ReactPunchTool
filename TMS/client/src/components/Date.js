import React, {useState} from "react";
import * as mi from '@material-ui/core';
import Activity from '../components/ActivityTime';

export default function Date({list}){

    const [dates, setDates] = useState([{from:"", to:""},]);
    
    const handleDate = (e) =>{ 
        let val = [...dates];
        val[0][e.target.name] = e.target.value;
        setDates(val);
        
    }
    //console.log(dates)
    return(
    <>
        <mi.Grid container>
            <mi.Grid item xs={4} style={{padding:"5px"}}>
                <mi.TextField fullWidth variant="outlined" name="from" label="From" type="date" value={dates.from} InputLabelProps={{shrink: true}} onChange={e => handleDate(e)}/>
            </mi.Grid>
            <mi.Grid item xs={4} style={{padding:"5px"}}>
                <mi.TextField fullWidth variant="outlined" name="to" label="To" type="date" value={dates.to} InputLabelProps={{shrink: true}} onChange={e => handleDate(e)} />
            </mi.Grid>
        </mi.Grid>
        <Activity date={dates} list={list}/>
    </>
    )
}
