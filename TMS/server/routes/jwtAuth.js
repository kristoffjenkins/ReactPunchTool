const pool = require('../db');
const router = require('express').Router();
const bcrypt = require('bcrypt');

//utils
const jwtGenerator = require('../utils/jwtGenerator');

//middlewares
const validInfo = require('../middlewares/validInfo');
const authorization = require('../middlewares/authorization');

//reqistering
router.post("/register", async (req, res) =>{

try{

    req.body.forEach(async(user) => {
        
            const {id, firstName, lastName, email, password, role} = user;
            //Check if user exist
            const response = await pool.query("SELECT * FROM  users WHERE _id = $1", [id]);

            if (response.rows.length !== 0 ) {
                return res.json("User already exist");
            }else{
                //Bcrypt the user password
                const saltRound = 10;
                const salt = await bcrypt.genSalt(saltRound);
                const bcryptPassword = await bcrypt.hash(password, salt);

                //Add new user
                const newUser = await pool.query("INSERT INTO users (_id, first_name, last_name, email, _password, _role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
                [id, firstName, lastName, email,bcryptPassword,role]);
                console.log('new user');
                //Generate jwt token
                const token = jwtGenerator(newUser.rows[0]._id);
                return res.json({token});
            } 
    });
} catch (err) {
    console.error(err.message)
}
    
});

//login
router.post("/login", validInfo, async (req, res) =>{
    try {
        // destructure req.body
        const {id, password} = req.body;
       

        //check if user exist
        const user = await pool.query("SELECT * FROM users WHERE _id = $1", [id]);

        if (user.rows.length === 0) {
            return res.json("User does not exist");
        }

        //check if password enetered against password stored.
        const validPassword = await bcrypt.compare(password, user.rows[0]._password);

        if(!validPassword) {
            return res.json("Incorrect Password or ID");
        }else{
            // assign jwt token
            const token = jwtGenerator(user.rows[0]._id);
            res.json({token});
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error ")
    }
});


router.get("/is-verify",authorization, async (req,res) =>{
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error ")
    }
})

module.exports = router;