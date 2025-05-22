const User = require("../models/User")
const bcrypt = require('bcryptjs');

/*
Need to define types of the params
*/

const handleSaveUser = async (req, res) => {
    const {username: uname, emailid: eid, password: pswd, terms} = req.body
    let error = {}


    //Username validation
    if(!uname || uname.length < 4){
        error.username = "Username should minimum length of 4"
    }
    
    //Email id validation
    if(!eid){
        error.emailid = "Email can't be empty"
    } else {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(eid)) {
            console.log("Valid Email address");
        } else {
            error.emailid = "Invalid Email address"
            console.log("Invalid Email address");
        }
    }

    //Password validation
    if (!pswd || pswd.length < 8) {
        error.password = "Password must be at least 8 characters long";
    } else {
        const hasLowerCase = /[a-z]/.test(pswd);
        const hasUpperCase = /[A-Z]/.test(pswd);
        const hasNumber = /[0-9]/.test(pswd);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pswd);
        const pswdStatus = { hasLowerCase, hasUpperCase, hasNumber, hasSpecialChar };
      
        if (!(hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar)) {
          error.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 numeric, and 1 special character";
          error.pswdStatus = pswdStatus
        } else {
          console.log("Password is valid");
        }
    }

    //Terms & condition status Validation
    if(!terms){
        error.terms = "Please accept the terms & conditions for successful signup"
    }
      

    if(Object.keys(error).length != 0){
        return res.status(400).json({ errors: error });
    }
    
    //Save the User in Database
    //Hashing the password
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(pswd, saltRounds);
        req.body.password = hash
        const result = await User.insertOne(req.body)
        res.status(201).json({ success: true, data: result })
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: err })
    }
}

module.exports = {
    handleSaveUser
}