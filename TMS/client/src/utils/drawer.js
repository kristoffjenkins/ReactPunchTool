import React from 'react'
import useStyles from './styles/drawerstyle';
import * as mui from '@material-ui/core';
import{ useTheme} from '@material-ui/core/styles';
//ai react icons
import * as ai from 'react-icons/ai';
import { Link } from 'react-router-dom';
//menuItem
import MenuItems from './menu';


export default function Drawer({close, open})  {
    const classes = useStyles();
    const theme = useTheme();
    

    return (
        <mui.Drawer className={classes.drawer} variant='persistent' anchor='left' open={open} classes={{paper: classes.paper}}>
            <div className={classes.drawerHeader}>
                <mui.IconButton onClick={close}>
                    {theme.direction === 'ltr' ? <ai.AiOutlineDoubleLeft/> : <ai.AiOutlineDoubleRight/>}
                </mui.IconButton>
            </div>

            <mui.Divider />

            

            <mui.List>
                {MenuItems.map((item, index ) =>{
                    const {title, icon,link} =item;
                    return(
                       
                        <Link to={link} className={classes.link}>
                            <div onClick={close}>
                                <mui.ListItem button key={index}>
                                    {icon && <mui.ListItemIcon >{icon}</mui.ListItemIcon>}
                                    {<mui.ListItemText  primary={title} />}
                                </mui.ListItem> 
                            </div>
                        </Link>  
                    )
                })}
            </mui.List> 
            
        </mui.Drawer>
    ) 
};


