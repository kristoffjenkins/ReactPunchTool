import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
//time library
import moment from 'moment';
//api
import * as api from '../api/api';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    paddingTop:'20px'
  },
  selector:{
      paddingLeft: '10px'
  }
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [activity, setActivity] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


    //Punch Fuction
    const HandlePunch = async(e) => {
         e.preventDefault(); 
        const punch_date = moment().format("DD/MM/YYYY");
        const punch_time = moment().utcOffset(-4).format(" HH:mm a ") ;
        const res = await api.activeUser();
        const {_id,first_name,last_name} =  res.data;
        const id_user = _id
        const body = {id_user,first_name,last_name,activity,punch_date,punch_time};
        //console.log(body);
        let data = await api.postPunch(body);
        let alert = data.data
        toast.success(alert)
        console.log(data); 

    };
    //Punch Fuction

  return (
    <>
    <Grid container className={classes.selector} >
    <Grid item xs={2}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Activity</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={activity}
          onChange={handleChange}
        >
          <MenuItem value="Start of Shift">Start of Shift</MenuItem>
          <MenuItem value="Break 1">Break 1</MenuItem>
          <MenuItem value="Break 2">Break 2</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Production">Production</MenuItem>
          <MenuItem value="End of Shift">End of Shift</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid className={classes.button} item xs={2}>
      <Button  variant="contained" color="secondary" onClick={(e) =>HandlePunch(e)}>Punch</Button>
    </Grid>
    </Grid>
    </>
    
  );
}