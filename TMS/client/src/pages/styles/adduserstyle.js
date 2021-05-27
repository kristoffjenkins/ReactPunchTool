import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({

    button:{
        margin: theme.spacing(1),
    },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        '& .MuiTextField-root':{
            margin: theme.spacing(1),
        },
      },
      contain:{
        //border:'2px solid black',
        width: '1600px',
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

export default useStyles;