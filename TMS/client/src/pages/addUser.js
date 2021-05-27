import React,{useState} from 'react';
import * as mui from '@material-ui/core';
import useStyles from './styles/adduserstyle'
import * as icons from 'react-icons/ai'
import Icon from '@material-ui/core/Icon'
import * as api from '../api/api'

export default function AddUser() {
    const classes = useStyles();

    const [newUsers, setNewUsers] = useState([
        {id:'',firstName:'', lastName:'',email:'',password:'', role:'user'},
    ]);

    const handleChangeInput = (index, event) =>{
        const values =[...newUsers];
        values[index][event.target.name] = event.target.value;
        //console.log(values);
        setNewUsers(values);
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(newUsers);
        const res = await api.addUsers(newUsers);
        console.log(res);
    }

    const addFields = () =>{
        setNewUsers([...newUsers, {id:'',firstName:'', lastName:'',email:'',password:'', role:'user'}]);
    }
    
    const removeFields = (index) =>{
        if(index > 0 ){
            const values = [...newUsers];
            values.splice(index,1);
            setNewUsers(values);
        }
    }
    
    return (
        <div className={classes.contain} >
            <mui.Typography component="h1" variant="h5">
                Add New Users
            </mui.Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                {newUsers.map((newUser,index) => (
                    <div key={index}>
                        <mui.TextField variant="outlined" name="id" label="ID" value={newUser.id} onChange={event => handleChangeInput(index, event)}/>
                        <mui.TextField variant="outlined" name="firstName" label="First Name" value={newUser.firstName} onChange={event => handleChangeInput(index, event)} />
                        <mui.TextField variant="outlined" name="lastName" label="Last Name" value={newUser.lastName} onChange={event => handleChangeInput(index, event)} />
                        <mui.TextField variant="outlined" name="email" label="Email" value={newUser.email} onChange={event => handleChangeInput(index, event)}/>
                        <mui.TextField variant="outlined" name="password" label="Password" value={newUser.password} onChange={event => handleChangeInput(index, event)}/>
                        <mui.TextField variant="outlined" name="role" label="Role" value={newUser.role} />
                        <mui.IconButton onClick={() => removeFields(index)}>
                            <icons.AiOutlineMinusCircle/> 
                        </mui.IconButton>
                        <mui.IconButton onClick={() => addFields()}>
                            <icons.AiOutlinePlusCircle/>
                        </mui.IconButton>
                    </div>
                ))}
                <mui.Button className={classes.button} variant="contained"  color="primary" type="submit" endIcon={<Icon>send</Icon>} onClick={handleSubmit}>Submit</mui.Button>
            </form>
        </div>
    )
}