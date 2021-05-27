import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import {useSelector,useDispatch} from 'react-redux';
import * as action from '../../redux/actions/index'
import * as api from '../../api/index'





export default function Timesheets() {

const dispatch =  useDispatch();

 useEffect(() => {
    dispatch(action.getUser());
    dispatch(action.getAllPunches());
    dispatch(action.getAllUsers()); 
    // eslint-disable-next-line
}, []);
  
 const state = useSelector((state)=> state);
const Punches = state.Punches;
const Users = state.AllUsers;
console.log(Punches)
const tableRef = React.createRef();

const columns =[
    {
        title:'ID', field:'id_user',  
    },
    {
        title:'First Name', field:'first_name',  
    },
    {
        title:'Last Name', field:'last_name',  
    },
    {
        title:'Activity', field:'activity',  
    },
    {
        title:'Date', field:'punch_date',  
    },
    {
        title:'Time', field:'punch_time',  
    },
];
    

    return (
        <div>
               <MaterialTable title="Punches"
                tableRef={tableRef}
                    data = {Punches}
                    columns={columns} 
                    options={{
                        grouping: true,
                        exportButton: true,
                        tooltip: 'Refresh Data'
                    }}
                    editable={{
                        onRowAdd:(newRow) => new Promise( (resolve,reject) => {
                            const {id_user,first_name,last_name,activity,punch_date,punch_time} = {...newRow};
                            //console.log(newRow);
                            const id = id_user;
                            const firstName = first_name;
                            const lastName = last_name;
                            const date = punch_date;
                            const time = punch_time;
                            const body = {id,firstName,lastName,activity,date,time};
                            //console.log(body);
                             setTimeout(async()=>{
                                await api.postPunch(body);
                                resolve();
                            },2000)  
                        }),

                        onRowDelete:selectedRow => new Promise((resolve,reject) =>{
                            const {id} = selectedRow;
                            const body = {id}
                            setTimeout(async() =>{
                                await api.deletePunch(body);
                                resolve();
                            },2000) 
                        }),
                        
                    }}
                
                
                /> 
                
                
        </div>
    )
}
