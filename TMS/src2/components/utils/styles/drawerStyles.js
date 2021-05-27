import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper:{
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        width: drawerWidth,
      },
    link:{
        textDecoration: 'none',
        color: '#070707',
        fontSize: '30px',
        listStyle: 'none'
    },

}));

export default useStyles;