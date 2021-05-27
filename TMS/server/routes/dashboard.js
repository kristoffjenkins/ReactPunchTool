const router = require('express').Router();
//database
const pool = require('../db');
//Middlewares
const authorization = require('../middlewares/authorization');


router.get("/", authorization, async(req, res) =>{
    try {
        //authorization middleware pass payload to req.user ---> res.json(req.user);

        const userID  = req.user;
        const user = await pool.query("SELECT _id, first_name,last_name, email, _role FROM users WHERE _id = $1", [userID]); 
        const currentUser = user.rows[0];
        res.json(currentUser);
        
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
//get all users
router.get("/all", authorization, async(req,res) =>{
    try {
        const all_users = await pool.query("SELECT _id, first_name, last_name FROM users");
        const list = all_users.rows
        res.send(list);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get user by id
router.post("/userID", async(req,res)=>{
    try {
        const {id} = req.body
        console.log(req.body);
        const user = await pool.query("SELECT _id, first_name, last_name FROM users WHERE _id = $1",[id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;