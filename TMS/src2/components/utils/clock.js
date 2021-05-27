import React,{useEffect, useState}from 'react';
import moment from 'moment';

export default function Clock({clock}){
    const [timeValue, setTimeValue] = useState('00:00');
    
   
    

    function time(){
        //var now = moment().utcOffset(-4).format("dddd, MMMM Do YYYY, h:mm:ss a") ;
       //console.log(now);
       const clockTime = moment().utcOffset(-4).format(" h:mm:ss a ") ;
        setTimeValue(clockTime);
       clock([clockTime,setTimeValue]);
       Interval();
    }

    useEffect(() => {
        time();

        //set state to null if logged out
        return () =>{
            setTimeValue({});
        };
        // eslint-disable-next-line 
    },[timeValue,setTimeValue]);
 
    
   
    //refresh
    function Interval(){
        var resfresh = 1000
        setTimeout(time,resfresh);
    }
    return(
        <>
            {timeValue}
        </>
    ) 
};


