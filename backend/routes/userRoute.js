const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();

    // create user
    router.post("/getuser", async (req,res) =>{
        const {name, email, age} = req.body;

        const User = require("../models/userModel")

        try {
            const userAdded = await User.create({
                name:name,
                email:email,
                age:age,
            });

            res.status(201).json(userAdded)
        } catch (error) {
            console.log(error);
            res.sendStatus(400).json({error: error.message})
        }
    })

    // get 
    router.get("/fetchall",async (req, res) => {
        try {
            const showAll = await User.find();
            res.status(200).json(showAll);
        } catch (error) {
            console.log(error);
            res.sendStatus(500).json({error: error.message});
        }
    })

    // get single user
    router.get("/get:id",async (req, res) => {
        const {id} = req.params;
        //url thi id bar kadhva mate req.params use thay
        // input field mathi value kadhva mate req.body
        try {
            const singleUser = await User.findById({_id : id});
            res.status(200).json(singleUser);
        } catch (error) {
            console.log(error);
            res.sendStatus(500).json({error: error.message});
        }
    })

    // delete
    router.delete("/delete:id",async (req, res) => {
        const {id} = req.params;
        try {
            const singleUser = await User.findByIdAndDelete({_id : id});
            res.status(200).json(singleUser);
        } catch (error) {
            console.log(error);
            res.sendStatus(500).json({error: error.message});
        }
    })

    // put/patch
    router.patch("/edit/:id",async (req, res) => {
        const {id} = req.params;
        const {name, email, age} = req.body;
        try {
            const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true,});
            res.status(200).json(updateUser);
        } catch (error) {
            console.log(error);
            res.send(500).json({error: error.message});
        }
    })

    module.exports=router;