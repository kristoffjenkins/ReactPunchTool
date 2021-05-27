import React from 'react';
import * as ai from 'react-icons/ai';

const MenuItems = [ 
    {
        title: 'Dashboard',
        icon: <ai.AiOutlineHome/>,
        link: '/dashboard'
    },
    {
        title: 'Timesheets',
        icon: <ai.AiOutlineFieldTime/>,
        link: '/Timesheets'
    },
    {
        title: 'Add User',
        icon: <ai.AiOutlineUserAdd/>,
        link: '/AddUser'
    },
    {
        title: 'Add Schedule',
        icon: <ai.AiOutlineSchedule/>,
        link: '/AddSchedule'
    },
   
]


export default MenuItems;