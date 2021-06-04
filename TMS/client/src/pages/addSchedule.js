import React, {useState, useEffect} from "react";
import Date from '../components/Date';
import * as api from '../api/api';
import * as mi from '@material-ui/core';

export default function AddSchedule() {

//GET EMPLOYEES
const listData = [];
const [employees, setEmployees] = useState([]);

async function getEmployees(){
    let res = await api.getUsers();
    let data = res.data;
    let list = [];
    data.forEach((element)=>{
        list.push({id: element._id, firstName: element.first_name, lastName: element.last_name});
    });
    setEmployees(list);
    //console.log(employees);
}

useEffect(()=>{
    getEmployees();
},[]);

const handleClick =(e, index) =>{
    if (e.target.checked === true){
        let object = {user:e.target.value}
        listData.push(object);
       
    }else{
        listData.splice(index, 1); 
    }

}

//Handle DATE

return (
    <mi.Grid container spacing={3} style={{border:"1px solid black"}}>
        <mi.Grid item xs={6} id="list">
            <mi.FormControl component="fieldset">
            <mi.FormLabel component="legend">Employees</mi.FormLabel>
                {employees.map((item,index) =>{
                    const {id, firstName, lastName } = item;
                    return(
                            <mi.FormControlLabel key={index} control={
                                <mi.Checkbox key={index} 
                                value={[id, firstName, lastName]}
                                onChange={e => handleClick(e, index)}
                                />
                            }
                            label={[id," - ", firstName," ", lastName]}
                            />
                        )
                })}
            </mi.FormControl>
        </mi.Grid>

        <mi.Grid item xs={6}>
            <Date list={listData}/>
        </mi.Grid>
       
    </mi.Grid>
)
}