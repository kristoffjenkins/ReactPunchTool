import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
//Notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Pages
import * as page from '../pages/index';
//Api
import * as api from '../api/api';

/*App Bar Imports*/
import * as mui from '@material-ui/core';
import * as icon from 'react-icons/ai';
import useStyles from './styles/mainstyle';
import clsx from 'clsx';
import Clock from '../utils/clock';
import Drawer from '../utils/drawer'
import Puncher from '../utils/punch'


toast.configure();

const Main = () => {
    //set auth state
    const [isAuth,setIsAuth] = useState(false);

    const setAuth = boolean => {
        setIsAuth(boolean);
    };

    //Get Authenticated Data
    async function CheckAuth(){
        try {
            let response = await api.getAuth();
            let data = response.data;
            data === true? setIsAuth(true) : setIsAuth(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    //Run at when component Renders
    useEffect(()=> {
        CheckAuth();
        return () =>{
            setIsAuth(null);
        }
        // eslint-disable-next-line
    },[]);

    //logout function
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false)
    };

    //clock function
    let timeValue = null;
    let setTimeValue = null;
    const updateClock = (timeFromClock) =>{
        // eslint-disable-next-line
        timeValue = timeFromClock[0];
        // eslint-disable-next-line
        setTimeValue = timeFromClock[1];
    };

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };


    return(
        <Router>
           {isAuth === true ? (
               <div className={classes.root}>
                   <mui.CssBaseline/>
                   <mui.AppBar position='fixed' className={clsx(classes.appBar,{[classes.appBarShift]: isOpen})}>
                        <mui.Toolbar>
                            <mui.IconButton edge='start' color='inherit' onClick={open} className={clsx(isOpen && classes.hide)}>
                                <icon.AiOutlineMenuUnfold color='white'/>
                            </mui.IconButton>

                            <mui.Typography className={classes.flexGrow} variant='h6' noWrap>
                                Time & Attendance
                            </mui.Typography>

                            <Clock clock={updateClock}/>
                            <span className={classes.flexGrow}><Puncher /></span>
                            

                            <div>
                                <mui.IconButton onClick={e => logout(e)} >
                                    <icon.AiOutlineLogout color='white'/>
                                </mui.IconButton>
                            </div>
                        </mui.Toolbar>
                   </mui.AppBar>

                   <Drawer close={close} open={isOpen}/>
                   
                   <main className={clsx(classes.content,{
                       [classes.contentShift] : isOpen,
                   })}>
                       <div className={classes.header}/>
                        <Switch>
                            <Route exact path="/login" render ={props =>  !isAuth? ( <page.Login {...props} setAuth = {setAuth} />) : (<Redirect to= "/dashboard" /> ) } />
                            <Route exact path="/dashboard" render ={props =>  isAuth  ? (<page.Dashboard {...props}  setAuth={setAuth} />) : (<Redirect to ="/login" />) }/>
                            <Route exact path="/punches" render ={props =>  isAuth  ? (<page.Punches {...props}  setAuth={setAuth} />) : (<Redirect to ="/login" />) }/>
                            <Route exact path="/schedule" render ={props => <page.Schedule {...props}  /> }/>
                            <Route exact path="/addUser" render ={props => <page.AddUser {...props}  /> }/>
                            <Route exact path="/addSchedule" render ={props => <page.AddSchedule {...props}  /> }/>
                        </Switch>
                   </main>
               </div>
           ):(
            <Switch>
                <Route exact path="/login" render ={props =>  ! isAuth ? ( <page.Login {...props} setAuth = {setAuth} />) : (<Redirect to= "/dashboard" /> ) } />
                <Route exact path="/dashboard" render ={props =>  isAuth  ? (<page.Dashboard {...props}  setAuth={setAuth} />) : (<Redirect to ="/login" />) }/>
                <Route exact path="/punches" render ={props =>  isAuth  ? (<page.Punches {...props}  setAuth={setAuth} />) : (<Redirect to ="/login" />) }/>
                <Route exact path="/schedule" render ={props => isAuth  ? (<page.Schedule {...props}  setAuth={setAuth} />) : (<Redirect to ="/login" />) }/>
                <Route exact path="/addUser" render ={props => isAuth  ? (<page.AddUser {...props}  setAuth={setAuth} />) : (<Redirect to ="/login" />) }/>
            </Switch>
           )}
        </Router>
    )
};

export default Main;