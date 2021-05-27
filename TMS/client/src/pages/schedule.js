import React,{useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import * as api from '../api/api'

export default function Schedule(){
    const [schedule, setSchedule] = useState([{
        id_user: '',
        first_name:'',
        last_name:'',
        activity: '',
        punch_date:'',
        punch_time:'',
    }]);


    async function GetSchedule(){
        try {
            let response = await api.getSchedule();
            let data = response.data;
            setSchedule(data);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        GetSchedule();

        return () =>{
            setSchedule(null)
        }
        // eslint-disable-next-line
    },[]);

    console.log(schedule);

    const columns = [
        {
            title: 'ID', field:'id_user'
        },
        {
            title: 'First Name', field:'first_name',
        },
        {
            title: 'Last Name', field:'last_name',
        },
        {
            title: 'activity', field:'activity',
        },
        {
            title: 'Date', field:'punch_date',
        },
        {
            title: 'Time', field:'punch_time',
        },
    ];

    return(
        <>
            <MaterialTable title="Schedule"
            data={schedule}
            columns={columns}
            options={{
                grouping: true,
                exportButton: true,
                actionsColumnIndex: -1,
                addRowPosition:'first',
                filtering:true,
                headerStyle:{
                    backgroundColor: '#181818',
                    color: '#F5F0F0'
                }
            }}
            editable={{
                onRowAdd:(newRow) => new Promise(async (resolve, reject) =>{
                    let current = await api.activeUser();
                    let activeUser = current.data
                    let newrowdata = [{id_creator:activeUser._id,...newRow}];
                    setTimeout(async() =>{
                        //console.log(newrowdata)
                        await api.AddSchedule(newrowdata[0]);
                       await GetSchedule()
                        resolve();
                    },1000)
                }),
                onRowDelete: (selectedRow) => new Promise((resolve,reject) =>{
                    setTimeout(async() =>{
                        let {id} = selectedRow
                        let body = {id}
                        await api.deleteSchedule(body);
                        GetSchedule();
                        resolve();
                    })
                }),
                onRowUpdate: (updateRow) => new Promise (async (resolve,reject) =>{
                    let current = await api.activeUser();
                    let activeUser = current.data
                    let newrowdata = [{id_creator:activeUser._id,...updateRow}];
                    setTimeout(async() =>{
                        
                        await api.updateSchedule(newrowdata[0]);
                        GetSchedule();
                        resolve();
                    },2000)
                })

            }}
            />
        </>
    )
}