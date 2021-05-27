import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import * as api from '../api/api'

export default function Punches(){
    const [Punches, setPunches] = useState([{
        id_user:'',
        first_name:'',
        last_name:'',
        activity:'',
        punch_date:'',
        punch_time:''
    }]);

    async function GetPunches(){
        try {
            let response = await api.getPunches();
            let data = response.data;
            setPunches(data);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(()=>{
        GetPunches();
        // eslint-disable-next-line
    },[])

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

    return(
        <>
            <MaterialTable title="Punches"
                    data = {Punches}
                    columns={columns} 
                    options={{
                        grouping: true,
                        exportButton: true,
                        actionsColumnIndex: -1,
                        addRowPosition:'first',
                        filtering: true,
                        headerStyle:{
                            backgroundColor: '#181818',
                            color: '#F5F0F0'
                        }
                    }}
                    editable={{
                        onRowAdd:(newRow) => new Promise((resolve, reject) =>{
                            setTimeout(async() =>{
                                //console.log(newRow)
                                await api.postPunch(newRow);
                                GetPunches();
                                resolve();
                            },1000)
                        }),

                        onRowDelete: selectedRow => new Promise((resolve, reject) =>{
                            const {id} = selectedRow;
                            const body ={id}
                            setTimeout(async() =>{
                                await api.deletePunch(body);
                                GetPunches();
                                resolve();  
                            },1000)
                        }),
                        onRowUpdate: updateRow=> new Promise((resolve, reject) =>{
                            
                            setTimeout(async() =>{
                                await api.updatePunch(updateRow);
                                GetPunches();
                                resolve();
                            },1000)
                        }),
                        
                    }}
                    />
        </>
    )
}