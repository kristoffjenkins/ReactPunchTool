import React,{useState} from 'react';
import * as mi from '@material-ui/core';
import useStyles from './styles/login.style';
import {toast} from 'react-toastify';

//api
import * as api from '../../api/index';

export default function Login({setAuth}) {
    const classes = useStyles();
    
    const [input, setInput] = useState({
        id:'',
        password:''
    })

    const {id, password} = input;

    const onChange = (e) =>{
        setInput({...input, [e.target.name] : e.target.value});
    };


    const OnSubmit = async (e) => {
        e.preventDefault();

        try {
            const body = {id, password};

            const {data} = await api.getLoginCreds(body);
        
             if(data.token) {

                localStorage.setItem("token", data.token);
                toast.success("Login Successfully",{
                    position: 'top-center',
                    hideProgressBar: true,
                    pauseOnHover: false,
                    autoClose:1500
                });
                //console.log(data.token);
                setAuth(true);

            } else {
                toast.error(data);
                setAuth(false);
            } 

        } catch (err) {
            console.error(err.message)
        }
    };

    

    return (
        <>
            <mi.Container component="main" maxWidth="xs">
                <mi.CssBaseline />
                <div className={classes.paper}>

                    <mi.Avatar className={classes.avatar}>
                        /icon/
                    </mi.Avatar>
                    <mi.Typography component="h1" variant="h5">
                        Sign In
                    </mi.Typography>

                    <form className={classes.form} noValidate onSubmit={(e) => OnSubmit(e)}>

                        <mi.TextField 
                            variant="outlined" 
                            margin="normal"
                            required
                            fullWidth
                            name="id"
                            label="ID"
                            autoFocus
                            value={id}
                            onChange = {e => onChange(e)}
                        />

                        <mi.TextField 
                            variant="outlined" 
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            autoFocus
                            type="password"
                            value={password}
                            onChange = {e => onChange(e)}
                        />
                        <mi.Button type="submit" fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Sign In
                        </mi.Button>
                    </form>
                   
                </div>
            </mi.Container>
        </>
    )
}
