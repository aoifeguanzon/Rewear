const express = require('express')
const router = express.Router();



const User = require('./configmodels/User')





const bcrypt = require('bcrypt');



router.post('/signup', (req,res) => {

    let {name,email,password,dateOfBirth} = req.body;
    name = name.trim()
    email = email.trim()
    password = password.trim()
    dateOfBirth = dateOfBirth.trim()


    if(name == "" || email == "" || password == "" || dateOfBirth == "" ){
        res.join({
            status: "FAILED",
            message:"Empty Input Failed",
        });
       
    }
     else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status:"FAILED",
            message: "INVALID name entered"
        })
            
        } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
               res.json({
                status:"FAILED!!!",
                message:"INVALID email entered"
               })    
        }
        else if(!new Date(dateOfBirth).getTime) {
            res.json({
                status:"FAILED!!!",
                message:"INVALID password entered"

            })

        }

        else if (password.length < 8) {
            res.json({
                status: "FAILED!!!!",
                message: "Password is too short"
            });

        }
        else {
            //Checking if user already exist

            User.find((email)).then(result => {

                if(result.length) {
                    res.json ({
                        status: "FAILED",
                        message: "User with the provided email already existed",
                    });
                    
                } else {
                    const saltrounds = 10;
                    bcrypt.hash(password,saltrounds).then(hashpassword => {

                        const newUser = new User({
                            name,
                            email,
                            password:hashpassword,
                            dateOfBirth,
                        });
                    
                        newUser.save().then(result => {
                            res.join({
                                status: "SUCCESS",
                                message: "Sign up successfully",
                                data: result,

                            });
                        }).catch(err => {
                            res.json({
                              status: "FAILED",
                              message: "An error occured while saving the user account"  
                            })
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while hashing for the password",
                        });
                    })
                        

                }

            }).catch(err => {

                console.log(err);
                res.json({
                    status:"FAILED",
                    message:"An error occurred while checking for an existing user"
                });

            })
        }


})


router.post('/signin', (req,res) => {
     let {email,password} = req.body;
    email = email.trim()
    password = password.trim()

    if(email == "" || password == "") {

        res.json({

            status: "FAILED",
            message: "Empyty credential failed"
        })


    } else {
        User.find({email})
        .then(data => {
            if(data) {

                const hashpassword = data[0].password;
                bcrypt.compare(password, hashpassword).then(result => {
                    if(result){



                        res.json({

                            status: "SUCCESS",
                            message: "SIGN IN SUCCESSFULLY",
                            data: "data"

                        })
                      

                    } else {
                        res.json ({
                            staus: "FAILED",
                            message: "Invalid Failed Password",

                        })
                    }




                })

                .catch(err => {
                    res.json ({
                        status: "FAILED",
                        message: "An error occurred while comparing password"
                    })
                })
            } else{
                res.json ({
                    status: "FAILED",
                    message: "Invalid credential error"
                })
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occured while checking for existing user"
            })
        })
    }


    
} )


module.exports = router;

