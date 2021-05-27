module.exports = (req, res,next) => {
    const {id, firstName, lastName, email, password, role} = req.body;
    console.log(req.body);

    //Validate Email pattern
    function ValidEmail(email){
         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    //check if fields are empty
    if(req.path === "/register") {
        //console.log(!email.lenght);

        if (![id, firstName, lastName,email,password,role].every(Boolean)) {
            return res.json("Missing Credentials");
        }

        else if (!ValidEmail(email)) {
            return res.json("Invalid Email Address");
        }
        
    }
    else if (req.path === "/login") {
        if (![id, password].every(Boolean)) {
            return res.json("Missing Credentials");
        }
    }
    next();
}