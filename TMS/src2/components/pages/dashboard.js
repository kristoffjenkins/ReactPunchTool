import React, {useEffect} from 'react';
import * as mui from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
//actions
import * as actions from '../../redux/actions/index';

export default function Dashboard() {
    

    const dispatch = useDispatch(); 

    //dispatch request to get user details 
    useEffect(() => {
        dispatch(actions.getUser());
        dispatch(actions.getAllPunches());
    }, [dispatch]);

     

    //access global state
    const state = useSelector(state => state);
    console.log(state);

    const User = state.User;
    //const Punches = state.Punches;
    //console.log(Punches);

    //destructure Usre state
    const { first_name,_role} = User;



  




    return (
        <>
            <mui.CssBaseline/>
            {first_name},{_role}
        </>
    )
}

