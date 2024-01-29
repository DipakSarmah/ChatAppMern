const router = require('express').Router();
const User = require('../models/User');

//creating user

router.post('/',async(req, res)=>{
    try{
        const {name,email, password, picture}= req.body;
        console.log(req.body);
        const user = await User.create({name,email,password,picture});
        console.log(user);
        res.status(201).json(user);
    }
    catch(err){
        let msg;
        if(err.code === 11000){
            msg = 'user already exists';
        }else{
            msg = err.message;
        }
        console.log(err);
        res.status(400).json(msg);
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findByCredentials(email,password);
        user.status = 'online';
        await user.save();
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err.message);
    }
})

module.exports = router;