import React from 'react';
import * as ai from 'react-icons/ai';

const MenuItems = [ 
    {
        title: 'Dashboard',
        icon: <ai.AiOutlineHome/>,
        link: '/dashboard'
    },
    {
        title: 'Punches',
        icon: <ai.AiOutlineFieldTime/>,
        link: '/punches',

    },
    {
        title: 'Schedule',
        icon: <ai.AiOutlineFieldTime/>,
        link: '/schedule',

    },
    {
        title: 'Add User',
        icon: <ai.AiOutlineUserAdd/>,
        link: '/addUser'
    },
    {
        title: 'Add Schedule',
        icon: <ai.AiOutlineSchedule/>,
        link: '/addSchedule'
    },
   
]


export default MenuItems;