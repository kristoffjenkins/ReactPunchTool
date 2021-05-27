import React, {useEffect,useState} from 'react';
import * as mui from '@material-ui/core';
//Api
import * as api from '../api/api';

export default function Dashboard(){
    const [activeUser, setActiveUser] = useState({
        _id:'',
        first_name:'',
        last_name:'',
        email:'',
        _role:''
    });
    //const {_id,first_name,last_name,email,_role} = activeUser

    async function getCurrentUser(){
        try {
            let response = await api.activeUser();
            let data = response.data;
            setActiveUser(data);
            
            
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getCurrentUser();
        // eslint-disable-next-line
    },[])
    //console.log(activeUser);


    return(
        <>
            <mui.CssBaseline/>
            <h1>Dashboard</h1>
        </>
    )
}