import React from 'react'
//Notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//main 
import Main from './components/main'
toast.configure();

const App = () => {
    
    return (
        <>
            <Main/>
        </>
    )
}

export default App;