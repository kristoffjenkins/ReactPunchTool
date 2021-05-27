import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

//Notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//pages
import * as pages from './pages/pages';
//layout
//import * as layout from './layout/index';
//api
import * as api from '../api/index';


//<--APP_BAR Imports -->
//Styling libary
import * as mui from '@material-ui/core';
//Icons
import * as ai from 'react-icons/ai';
//Custom Styles
import useStyles from './mainStyles';
import clsx from 'clsx'; 
//Clock
import Clock from './utils/clock';
//Drawer
import Drawer from './utils/drawer'
//Punch
import Punch from './punch'


toast.configure();
//<--APP_BAR Imports-->

const Main = () => {
    //set Authentication State
    const [isAuth, setIsAuth] = useState(false);

    //Parent Function to set Authentication State
    const setAuth = boolean => {
        setIsAuth(boolean);
    };

    //Get Authenticated Data From Server
    async function Authenticate(){

        try {
            let res = await api.getAuth();
            res = res.data;
            res === true? setIsAuth(true) : setIsAuth(false);
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }
        
    };

    //Always Check If User is Authenticated After re-Render
    useEffect(() => {
        Authenticate();
        Interval();
        // eslint-disable-next-line
     }, []);

     //refresh
    function Interval(){
        var resfresh = 3600000
        setTimeout(Authenticate,resfresh);
    }

    //App Bar -->
    const classes = useStyles();
    const [DrawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);

    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    //App Bar -->

    //Clock Functions
    let timeValue = null;
    let setTimeValue = null;

    const updateClock = (timeFromClock) =>{
        // eslint-disable-next-line
        timeValue = timeFromClock[0];
        // eslint-disable-next-line
        setTimeValue = timeFromClock[1];
    };
    //Clock Functions

    //log out function
    const logout =(e) =>{ 
        //prevent browers from default refresh
        e.preventDefault(); 
        //remove token from browser storage
        localStorage.removeItem("token");
        setAuth(false) 
    };
    //log out function

    

    //Returned Data
    return (
        <>
           <Router>
           {isAuth ? (
            <div className={classes.root}>
                <mui.CssBaseline/>
                <mui.AppBar position='fixed' className={clsx(classes.appBar,{[classes.appBarShift]: DrawerOpen})}>
                    
                    <mui.Toolbar>

                        <mui.IconButton edge='start' color='inherit' onClick={handleDrawerOpen} className={clsx(DrawerOpen && classes.hide)}>
                            <ai.AiOutlineMenuUnfold color='white'/>
                        </mui.IconButton>

                        <mui.Typography className={classes.flexGrow} variant='h6' noWrap>
                            Time & Attendance
                        </mui.Typography>

                        <Clock clock={updateClock}/>
                        <div className={classes.flexGrow}>
                            <Punch />
                        </div>
                        
                            
                        <div>
                            <mui.IconButton onClick={e => logout(e)} >
                                <ai.AiOutlineLogout color='white'/>
                            </mui.IconButton>
                        </div>
                    </mui.Toolbar>
                </mui.AppBar>
                
                <Drawer close={handleDrawerClose} open= {DrawerOpen} props />
                
                <main className={clsx(classes.content,{
                    [classes.contentShift] : DrawerOpen,
                })}>
                    <div className={classes.header} />

                    <Switch>
                        <Route exact path="/login" render ={props =>  !isAuth? ( <pages.login {...props} setAuth = {setAuth} />) : (<Redirect to= "/dashboard" /> ) } />
                        <Route exact path="/dashboard" render ={props =>  isAuth  ? (<pages.dashboard {...props}  Auth={Authenticate} />) : (<Redirect to ="/login" />) }/> 
                        <Route exact path="/AddUser" render ={props => isAuth  ? (<pages.add_user {...props}/>) : (<Redirect to ="/login" /> )} />
                        <Route exact path="/AddSchedule" render ={props => isAuth  ? (<pages.add_schedule {...props}/>) : (<Redirect to ="/login" /> )} />
                        <Route exact path="/timesheets" render ={props => isAuth  ? (<pages.timesheet {...props}/>) : (<Redirect to ="/login" /> )} />
                    </Switch>
                </main>
            </div>
            ) : (<Switch>
                    <Route exact path="/login" render ={props =>  !isAuth? ( <pages.login {...props} setAuth = {setAuth} />) : (<Redirect to= "/dashboard" /> ) } />
                    <Route exact path="/dashboard" render ={props =>  isAuth  ? (<pages.dashboard {...props}  Auth={Authenticate} />) : (<Redirect to ="/login" />) }/>
                </Switch>)}
            

               
           </Router>
        </>
    )

};

//Export Default Constant
export default Main;