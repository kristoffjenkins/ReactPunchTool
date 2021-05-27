const router = require('express').Router();
const pool = require('../db');

const authorization = require('../middlewares/authorization');

router.get("/punches", authorization, async(req,res) =>{
    try {
        const userID = req.user;
        const user = await pool.query("SELECT _id, first_name, last_name, email, _role FROM users WHERE _id = $1", [userID]);
        const currentUser = user.rows[0];
        const role = currentUser._role;

        if(role === 'admin'){
            const punches = await pool.query("SELECT * FROM punches");
            res.json(punches.rows)
            //console.log(punches.rows);
        }else{
            const punches = await pool.query("SELECT * FROM punches WHERE id_user = $1",[currentUser]);
            res.json(punches.rows);
            //console.log(punches.rows)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post("/punches", async(req,res)=>{
    try {
        //Destructure Punch data
        const {id_user,first_name,last_name, activity, punch_date, punch_time} = req.body;
        // console.log(req.body);
        //add punch
        await pool.query("INSERT INTO punches (id_user,first_name,last_name, activity, punch_date, punch_time) VALUES($1, $2, $3, $4,$5,$6) RETURNING *",
        [id_user,first_name,last_name, activity, punch_date, punch_time]);
        res.json('Punch Submited Successfully')
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/punches/delete", async(req,res) =>{
    try {
        const {id} = req.body;
        //console.log(req.body);

        await pool.query("DELETE FROM punches WHERE id =$1" ,[id]);
        res.json('Deleted Succesfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
});

router.put("/punches/update", async(req,res) =>{

    try {
        const {id,id_user,first_name,last_name, activity, punch_date, punch_time} = req.body;

         await pool.query("UPDATE punches SET id_user = $2, first_name = $3,last_name = $4, activity =$5, punch_date =$6, punch_time =$7 WHERE id = $1",
        [id,id_user,first_name,last_name, activity, punch_date, punch_time]);
        res.json('Updated Successfully'); 
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("server Error")
    }
})

//schedule routes
router.get("/schedule", authorization, async(req,res) =>{
    try {
        const userID = req.user;
        const user = await pool.query("SELECT _id, first_name, email, _role FROM users WHERE _id = $1", [userID]);
        const currentUser = user.rows[0];
        const role = currentUser._role;
       
        if(role === 'admin'){
            const schedule = await pool.query("SELECT * FROM schedule");
            res.json(schedule.rows);
        }else{
            const schedule = await pool.query("SELECT * FROM schedule WHERE id_user = $1", [userID]);
            res.json(schedule.rows);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post("/schedule", async(req,res)=>{
    try {
        //Destructure Punch data
        const {id_creator,id_user,first_name,last_name,activity, punch_date, punch_time} = req.body;
        console.log(req.body)
        //add punch
        await pool.query("INSERT INTO schedule (id_creator, id_user,first_name,last_name, activity, punch_date, punch_time) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *",
        [id_creator,id_user,first_name,last_name, activity, punch_date, punch_time]);

        res.json('schedule created successfully');
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.post("/schedule/delete", async(req,res) =>{
    try {
        const {id} = req.body;
        await pool.query("DELETE FROM schedule WHERE id = $1",[id]);
        res.json("Deleted Successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.put("/schedule/update", async(req,res) =>{
    try {
        const {id,id_creator,id_user,first_name,last_name,activity, punch_date, punch_time} = req.body;
        await pool.query("UPDATE schedule SET id_user = $2, id_creator = $3, first_name = $4,last_name = $5, activity =$6, punch_date =$7, punch_time =$8 WHERE id = $1",
        [id, id_user,id_creator, first_name, last_name, activity, punch_date, punch_time]);
        res.json("Schedule updated sucessfully");

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error")
    }
})

module.exports = router;