const express = require("express");
const cors = require("cors");
const AuthRoute = require("./routes/jwtAuth.js");
const DashboardRoute = require('./routes/dashboard');
const TimesheetRoute = require('./routes/timesheets');


const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json()); //access re.body from client side
app.use(cors());


//***Routes**//
/*login routes*/
app.use("/auth", AuthRoute);

/*Dashboard*/
app.use("/dashboard",DashboardRoute );

/*Timesheet*/
app.use("/timesheets",TimesheetRoute);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}); 